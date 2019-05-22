pragma solidity ^0.4.25;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address deployedAddress = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(deployedAddress);
    }
    
    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public contributerCount;
    
    modifier restricted {
        require(msg.sender == manager, "Must be manager.");
        _;
    }
    
    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable{
        require(msg.value >= minimumContribution, "Minimum contribution not met.");
        approvers[msg.sender] = true;
        contributerCount++;
    }
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender], "Must be a contributer");
        require(!request.approvals[msg.sender], "Must not have already approved");
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(!request.complete, "Request not already completed");
        require(request.approvalCount > (contributerCount/2), "Must meet consensus");
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function summary() public view restricted returns(uint, uint, uint, uint, address) {
      return (
        minimumContribution,
        address(this).balance,
        requests.length,
        contributerCount,
        manager
      );
    }

    function getRequestsCount() public view returns(uint) {
      return requests.length;
    }
}