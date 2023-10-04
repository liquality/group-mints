import { Message, Group } from "@/types/chat";
//@ts-ignore
import NetworkService from "./NetworkService";



const UserService = {
  createGroup: async function (groupObject: Group) {
    return NetworkService.postResourceWithAuth("/v1/group/", groupObject);
  },

  createMessage: async function (messageObject: Message) {
    return NetworkService.postResourceWithAuth("/v1/message/", messageObject);
  },

  loginUser: async function (userEmail: string) {
    return NetworkService.getResourceWithAuth("/v1/user/login/" + userEmail);
  },
};

export default UserService;
