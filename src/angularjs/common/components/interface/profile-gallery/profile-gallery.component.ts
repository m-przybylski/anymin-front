import {ProfileGalleryComponentController} from './profile-gallery.controller'

export class ProfileGalleryComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ProfileGalleryComponentController
  template = require('./profile-gallery.pug')
  bindings: {[boundProperty: string]: string} = {
    documents: '<'
  }
}
