import { Message, Group } from "@/types/chat";
//@ts-ignore
import NetworkService from "./NetworkService";



const UserService = {
  createGroup: async function (groupObject: Group) {
    return NetworkService.postResourceWithAuth("/v1/group/", groupObject);
  },

  readGroup: async function (id: string) {
    return NetworkService.getResourceWithAuth("/v1/group/", id);
  },

  createMessage: async function (messageObject: Message) {
    return NetworkService.postResourceWithAuth("/v1/message/", messageObject);
  },

  createInvite: async function (groupId: Group) {
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

export default UserService;