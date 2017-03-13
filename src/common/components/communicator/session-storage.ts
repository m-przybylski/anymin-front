export class SessionStorage {

  // TODO: add types
  clientSession: any
  expertSessions: any

  constructor() {
    this.clientSession = null
    this.expertSessions = {}
  }

  getClientSession = () => {
    return this.clientSession
  }

  setClientSession = (session: any) => {
    this.clientSession = session
  }

  addExpertSession = (serviceId: string, session: any) => {
    this.expertSessions[String(serviceId)] = session
  }

  findExpertSession = (serviceId: string) => {
    return this.expertSessions[String(serviceId)]
  }

  removeExpertSession = (session: any) => {
    delete this.expertSessions[String(session.id)]
  }
}
