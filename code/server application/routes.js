const EventController = require('./Controllers/EventController');
const MembersController = require('./Controllers/MembersController');
const ChatroomController = require('./Controllers/ChatroomController');
const ChatroomMembersController = require('./Controllers/ChatroomMembersController');
const ContentController = require('./Controllers/ContentController');
const EventGuestController = require('./Controllers/EventGuestController');
const GroupController = require('./Controllers/GroupController');
const HotPopController = require('./Controllers/HotPopController');
const MembersInGroupController = require('./Controllers/MembersInGroupController');
const MessageController = require('./Controllers/MessageController');


module.exports = (app) => {

    app.get('/showAll_Event', EventController.showAllEvent );
    app.post('/insert_Event', EventController.insertEvent );

    app.get('/showAll_Member', MembersController.showAllMember );
    app.post('/insert_Member', MembersController.insertMember);

    app.get('/showAll_Chatroom', ChatroomController.showAllChatroom);
    app.post('/insert_Chatroom', ChatroomController.insertChatroom);

    app.get('/showAll_Chatroom_Members',ChatroomMembersController.showAllChatroomMembers );
    app.post('/insert_Chatroom_Members', ChatroomMembersController.insertChatroomMembers );

    app.get('/showAll_Content', ContentController.showAllContent );
    app.post('/insert_Content', ContentController.insertContent );

    app.get('/showAll_Event_Guest', EventGuestController.showAllEventGuest );
    app.post('/insert_Event_Guest', EventGuestController.insertEventGuest );

    app.get('/showAll_HotPops', GroupController.showAllGroup );
    app.post('/insert_HotPops', GroupController.insertGroup );

    app.get('/showAll_Chatroom_Members', HotPopController.showAllHotPops);
    app.post('/insert_Chatroom_Members', HotPopController.insertHotPops);

    app.get('/showAll_Members_In_Group', MembersInGroupController.showAllGroupMembers);
    app.post('/insert_Members_In_Group', MembersInGroupController.insertGroupMembers);
    
    app.get('/showAll_Message', MessageController.showAllMessage );
    app.post('/insert_Message', MessageController.insertMessage );
    
}