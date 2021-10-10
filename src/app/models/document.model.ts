export interface DocumentModel {
  id: string;
  name: string;
  displayName: string;
  physicalName: string;
  blobLocation: string;
  company: string;
  dateOfDocument: string;
  uploadDate: string;
  lastUpdate: string;
  description: string;
  folderName: string;
  registerName: string;
  tags: string[]
  unsorted: boolean
  category: string;
}
