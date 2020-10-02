export interface ISearchableSelectConfig {
  trackBy?: string;
  placeholder?: string;
  addCaption?: string;
  required?: boolean;
  allowEmpty?: boolean;
  enableAdd?: boolean;
  multiple?: boolean;
  internalSearch?: boolean;
  hasGroups?: boolean;
}

export class SearchableSelectConfig implements ISearchableSelectConfig {
  constructor (
    public trackBy?: string,
    public placeholder?: string,
    public addCaption?: string,
    public required?: boolean,
    public enableAdd?: boolean,
    public allowEmpty?: boolean,
    public multiple?: boolean,
    public internalSearch?: boolean,
    public hasGroups?: boolean,
    public preselectFirst?: boolean
  ) {
    this.trackBy = this.trackBy ? this.trackBy : 'label'
    this.placeholder = this.placeholder ? this.placeholder : 'selectValue'
    this.addCaption = this.addCaption ? this.addCaption : ''
    this.enableAdd = this.enableAdd  !== undefined ? this.enableAdd : false
    this.allowEmpty = this.allowEmpty  !== undefined  ? this.allowEmpty : true
    this.multiple = this.multiple  !== undefined  ? this.multiple : false
    this.internalSearch = this.internalSearch  !== undefined  ? this.internalSearch : false
    this.hasGroups = this.hasGroups  !== undefined  ? this.hasGroups : false
    this.preselectFirst = this.preselectFirst  !== undefined  ? this.preselectFirst : false
  }
}
