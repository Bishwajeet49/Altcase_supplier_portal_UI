import { baseUrl } from "./baseUrls";
const apiVersion = "v1";

export const endpoints = {
    // Authentication & Onboarding
    signin: `${baseUrl}/api/${apiVersion}/auth/signin`,
    refreshToken: `${baseUrl}/api/${apiVersion}/auth/refresh-token`,
    startRegistration: `${baseUrl}/api/${apiVersion}/auth/start-registration`,
    verifyMobileAndGetUser: `${baseUrl}/api/${apiVersion}/auth/verify-mobile-and-get-user`,
    completeProfile: `${baseUrl}/api/${apiVersion}/auth/complete-profile`,
    verifyEmailAndComplete: `${baseUrl}/api/${apiVersion}/auth/verify-email-and-complete`,

    //events
   
    createEvent: `${baseUrl}/api/${apiVersion}/events`,//create event
    createSubEvent: `${baseUrl}/api/${apiVersion}/sub-events`,//create sub event tickets
    getSubEvents: `${baseUrl}/api/${apiVersion}/sub-events/event`,//get sub events for an event
    getSubEventsList: `${baseUrl}/api/${apiVersion}/sub-events`,//get sub events list for event listing
    getParentEventPrefillValues:(eventUuid)=>`${baseUrl}/api/${apiVersion}/events/${eventUuid}`,//get parent event prefill values
    updateEvent: (eventUuid)=>`${baseUrl}/api/${apiVersion}/events/${eventUuid}`,//update event
    updateSubEvent: (subEventUuid)=>`${baseUrl}/api/${apiVersion}/sub-events/uuid/${subEventUuid}`,//update sub event
    deleteEvent: (eventUuid)=>`${baseUrl}/api/${apiVersion}/events/${eventUuid}`,//delete event
    deleteSubEvent: (subEventUuid)=>`${baseUrl}/api/${apiVersion}/sub-events/uuid/${subEventUuid}`,//delete sub event

    //event masters
    getEventMasters: `${baseUrl}/api/${apiVersion}/event-masters`,

    //adreess
    getAddressByPincode: `${baseUrl}/api/${apiVersion}/pincodes/location/`,

    //form fields
    createFormFieldsBulk: `${baseUrl}/api/${apiVersion}/form-fields/fields/bulk`,
    updateFormFields: `${baseUrl}/api/${apiVersion}/form-fields/sub-events`, // PUT endpoint for updating form fields
    getFormFields: `${baseUrl}/api/${apiVersion}/form-fields/sub-events`,// get form fields for a sub-event

    // Participant Registration
    getRegistrationForm: `${baseUrl}/api/${apiVersion}/participant-registration/sub-events`, // GET /:subEventUuid/registration-form
    submitRegistration: `${baseUrl}/api/${apiVersion}/participant-registration/sub-events`, // POST /:subEventUuid/register
    getParticipantsClean: (subEventUuid) => `${baseUrl}/api/${apiVersion}/participant-registration/sub-events/${subEventUuid}/participants/clean`, // GET participants with clean data

    // File Upload
    uploadFile: `${baseUrl}/api/${apiVersion}/uploads/single`, // POST for single file upload
};