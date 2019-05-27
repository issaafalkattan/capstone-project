import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

 export const ExcelFiles = new FilesCollection({
  collectionName: 'Files',

});

if (Meteor.isClient) {
  Meteor.subscribe('files.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.all', function () {
    return ExcelFiles.find().cursor;
  });
}
