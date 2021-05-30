import {TagModel} from "./tag.model";
import {CategoryModel} from "./category.model";
import {FolderModel} from "./folder.model";

export interface MetadataModel {
  tags: TagModel[];
  categories: CategoryModel[];
  folders: FolderModel[];
}
