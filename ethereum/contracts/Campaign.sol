pragma solidity ^0.5.8;

contract CampaignFactory {
  address[] public deployedCampaigns;

  function createCampaign(uint minimum) public {
    address deployed = address(new Campaign(minimum, msg.sender));
    deployedCampaigns.push(deployed);
  }
}

contract Campaign {

  struct Request {
    string description;
    uint value;
    address payable recipient;
    bool complete;
    uint approvalCount;
    mapping(address => bool) approvers;
  }

  address public manager;
  uint public minimumContribution;
  Request[] public requests;
  uint contributorCount;
  mapping(address => bool) public contributors;

  constructor(uint minimum, address creator) public payable{
    manager = creator;
    minimumContribution = minimum;
  }

  modifier restricted {
    require(msg.sender == manager, "Sender must be contract manager.");
    _;
  }

  function contribute() public payable{
    require(msg.value >= minimumContribution, "Minimum contribution not met.");
    contributors[msg.sender] = true;
    contributorCount++;
  }

  function createRequest(string memory description, uint value, address payable recipient) public restricted {
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

    require(contributors[msg.sender], "Must be a contributor");
    require(!request.approvers[msg.sender], "Must not have already contributed");

    request.approvers[msg.sender] = true;
    request.approvalCount++;
  }

  function finalizeRequest(uint index) public restricted {
    Request storage request = requests[index];

    require(!request.complete, "Request hasn't completed already");
    require(request.approvalCount > (contributorCount / 2), "Not enough approvals received");

    request.recipient.transfer(request.value);
    request.complete = true;
  }


}

