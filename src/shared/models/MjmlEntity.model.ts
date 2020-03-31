import {IMjmlAttribute} from "@/shared/models/MjmlAttribute.model";

export interface IMjmlEntity {
  tagName: String,
  attributes: IMjmlAttribute,
  children: IMjmlEntity[],
  content: String
}

export class MjmlEntity implements IMjmlEntity {
  constructor(
    public tagName: String,
    public attributes: IMjmlAttribute,
    public children: IMjmlEntity[],
    public content: String
  ) {
  }
}
