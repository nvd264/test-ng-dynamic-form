# Angular Material Dynamic Form

## Installation

```javascript
npm i @nvd264/ng-dynamic-form
```

## Setup

```javascript
// src/app.module.ts
import { DynamicFormModule } from 'dynamic-form';

@NgModule({
  imports: [
    ...
    DynamicFormModule
  ]
})
```

## Support form fields

```javascript
import {
  DropdownControl,
  TextboxControl,
  TextareaControl,
  CheckboxControl,
  RadioGroupControl,
  CustomFieldControl
} from 'dynamic-form';
```

## Custom buttons

```javascript
import { IFormAction } from 'dynamic-form';

// inside component
actions: IFormAction = {
  submit: {
    label: 'Save',
    color: 'primary'
  },
  reset: {
    label: 'Reset',
    color: ''
  }
};
```

## Dropdown Control

```javascript
new DropdownControl({
  key: 'demo', // form control name
  label: 'Dropdown',
  options: this.getPosts(), // return Observable<{id: number, title: string}[]>
  value: [1, 2], // default values
  order: 3,
  labelValue: 'id',
  labelName: 'title',
  multiple: true,
  onSearch: searchText => {
    this.pageOfPosts = 1;
    return this.getPosts(this.pageOfPosts, searchText);
  },
  loadMore: searchText => {
    this.pageOfPosts += 1;
    return this.getPosts(this.pageOfPosts, searchText);
  }
})
```

## Textbox Control

```javascript
new TextboxControl({
  key: 'firstName',
  label: 'First name',
  value: '',
  validators: [
    {
      validate: ErrorTypes.REQUIRED,
      message: 'First name is required'
    }
  ],
  order: 1,
})
```

## Textarea Control

```javascript
new TextareaControl({
  key: 'description',
  label: 'Description',
  order: 4,
  value: 'default',
  validators: [
    {
      validate: ErrorTypes.REQUIRED,
      message: 'Description is required',
    },
    {
      validate: ErrorTypes.MAX_LENGTH,
      message: 'Description must less than 10',
      data: 10
    },
    {
      validate: ErrorTypes.MIN_LENGTH,
      message: 'Description must greater than 2',
      data: 2
    }
  ]
})
```

## Checkbox Control
```javascript
new CheckboxControl({
  key: 'englishLevel',
  label: 'English Level',
  order: 5,
  value: [1, 4],
  options: [
    { id: 1, name: 'Fresher' },
    { id: 2, name: 'Junior' },
    { id: 3, name: 'Senior' },
    { id: 4, name: 'Master' },
  ],
  labelValue: 'id',
  labelName: 'name',
  validators: [
    {
      validate: ErrorTypes.REQUIRED,
      message: 'Checkbox required. (2)',
      data: 2
    }
  ]
})
```

## Radio Control
```javascript
new RadioGroupControl({
  key: 'sex',
  label: 'Sex',
  order: 6,
  value: 3,
  options: [
    { id: 1, text: 'Radio 1' },
    { id: 2, text: 'Radio 2' },
    { id: 3, text: 'Radio 3' },
  ],
  labelValue: 'id',
  labelName: 'text',
  validators: [
    {
      validate: ErrorTypes.REQUIRED,
      message: 'Sex is required.'
    }
  ]
})
```

## Custom control

```javascript
// TelWrapperComponent required 2 input
@Input() form;
@Input() controlKey;

new CustomFieldControl({
  key: 'tel',
  order: 10,
  component: TelWrapperComponent,
  validators: [
    {
      validate: ErrorTypes.REQUIRED,
      message: 'Custom field is required'
    }
  ]
})
```

