export interface ISearchableSelectConfig {
  trackBy?: string;
  placeholder?: string;
  addCaption?: string;
  required?: boolean;
  allowEmpty?: boolean;
  enableAdd?: boolean;
  multiple?: boolean;
  internalSearch?: boolean;
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
    public internalSearch?: boolean
  ) {
    this.trackBy = this.trackBy ? this.trackBy : 'label'
    this.required = this.required
    this.placeholder = this.placeholder ? this.placeholder : 'selectValue'
    this.addCaption = this.addCaption ? this.addCaption : ''
    this.enableAdd = this.enableAdd ? this.enableAdd : false
    this.allowEmpty = this.allowEmpty ? this.allowEmpty : true
    this.multiple = this.multiple ? this.multiple : false
    this.internalSearch = this.internalSearch ? this.internalSearch : false
  }
}
