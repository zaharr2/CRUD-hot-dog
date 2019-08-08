import Vue from 'vue'
import Vuex from 'vuex'
import contacts from './modules/contacts'
import pending from './modules/pending'
import profile from './modules/profile'
import session from './modules/session'
import user from './modules/user'
import vcard from './modules/vcard'
import scannedVCards from './modules/scannedVCards'
import device from './modules/device'
import contactInfo from './modules/contactInfo'
import invitations from './modules/invitations'
import search from './modules/search'
import nylasAuth from './modules/nylasAuth'
import connection from './modules/connection'
import avatar from './modules/avatar'
import tags from './modules/tags'
import token from './modules/token'
import history from './modules/history'
import notes from './modules/notes'
// import contactsGroups from './modules/contactsGroups'
import statistics from './modules/statistics'
import contactsFB from './modules/contactsFB'
import contactFB from './modules/contactFB'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    contacts,
    pending,
    profile,
    session,
    user,
    vcard,
    scannedVCards,
    device,
    contactInfo,
    invitations,
    search,
    nylasAuth,
    connection,
    avatar,
    tags,
    token,
    history,
    notes,
    // contactsGroups,
    statistics,
    contactsFB,
    contactFB
  },
  strict: debug
})
