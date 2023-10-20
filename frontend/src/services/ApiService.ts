import { Message, Group, GroupCreation } from "@/types/chat";
//@ts-ignore
import NetworkService from "./NetworkService";



const ApiService = {
  createGroup: async function (groupObject: GroupCreation) {
    return NetworkService.postResourceWithAuth("/v1/group/", groupObject);
  },

  //Includes groupId and public address
  createMember: async function (member: any) {
    return NetworkService.postResourceWithAuth("/v1/member/", member);
  },

  readGroup: async function (groupId: string) {
    return NetworkService.getResourceWithAuth("/v1/group/" + groupId);
  },

  readGroupByMemberAddress: async function (memberAddress: string) {
    return NetworkService.getResourceWithAuth("/v1/member/" + memberAddress);
  },

  getNumberOfMembersInGroup: async function (groupAddress: string) {
    return NetworkService.getResourceWithAuth("/v1/members/" + groupAddress);
  },

  createMessage: async function (messageObject: Message) {
    return NetworkService.postResourceWithAuth("/v1/message/", messageObject);
  },

  createInvite: async function (groupId: Partial<Group>) {
    return NetworkService.postResourceWithAuth("/v1/invite/", groupId);
  },

  readInvite: async function (inviteLink: string) {
    return NetworkService.getResourceWithAuth("/v1/invite/" + inviteLink);
  },

  readMessagesByGroupId: async function (groupId: number) {
    return NetworkService.getResourceWithAuth("/v1/message/" + groupId);
  },


  loginUser: async function (userEmail: string) {
    return NetworkService.getResourceWithAuth("/v1/user/login/" + userEmail);
  },
};

export default ApiService;