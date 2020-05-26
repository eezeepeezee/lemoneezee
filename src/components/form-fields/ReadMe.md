# Form Fields

## Usage

### Required settings

**Text Input**

```twig
{% include '/components/form-fields/form-fields.twig' with
    {
      name: 'username',
      label: 'What is your name?',
      type: 'text'     
    } only
%}
```

Output:

```html
<div class="form-field">
  <div class="field-label">
    <label for="username">What is your name?</label>
  </div>
  <div class="field-input">
    <input class="" type="text" placeholder="" name="username" id="username" value="">
  </div>
</div>
```

**Checkbox**

```twig
{% include '/components/form-fields/form-fields.twig' with
    {
      name: 'not-robot',
      label: 'I am not a robot',
      type: 'checkbox'
    } only
%}
```

Output:

```html
<div class="form-field">
  <div class="field-input">
    <label class="label--checkbox">
      <input type="checkbox" class="sr-only" name="not-robot"> 
      I am not a robot 
      <span class="checkbox" aria-hidden="true">
        <span class="icon" aria-hidden="true">
          <svg class="icon__svg">
            <use xlink:href="./assets/img/icons/sprite.svg#tick"></use>
          </svg>
        </span>
      </span>
    </label>
  </div>
</div>
```

### Optional settings

**Text input**

```twig
{% include '/components/form-fields/form-fields.twig' with
    {
      formFieldClass: 'form-field--general',
      fieldInputClass: 'field-input--colored',
      name: 'username',
      label: 'What is your name?',
      niceLabel: true,
      type: 'text',
      placeholder: 'Write your name and lastname',
      class: 'super-input',
      attributes: 'required disabled',
      leftIcon: 'user',
      leftButton: 'eye-open',
      leftButtonAttributes: 'class="js-type" aria-label="Toggle smth"',
      rightButton: 'eye-closed',
      rightIcon: 'lock',
      rightButtonAttributes: 'class="js-password" aria-label="Toggle password"',
      showError: true      
    } only
%}
```

Output:

```html
<div class="form-field form-field--general">

  <div class="field-label">
    <label for="username">What is your name?</label>
  </div>

  <div class="field-input f--li f--lb f--ri f--rb">
    <input class="super-input" type="text" placeholder="Write your name and lastname" name="username" id="username" value="" aria-describedby="error-username" required disabled="disabled">
    
    <div class="field-l">
      <div class="field-icon">
        <span class="icon" aria-hidden="true">
          <svg class="icon__svg">
            <use xlink:href="./assets/img/icons/sprite.svg#user"></use>
          </svg>
        </span>
      </div>
      <button class="field-button" type="button" aria-label="Toggle smth">
        <span class="icon" aria-hidden="true">
          <svg class="icon__svg">
            <use xlink:href="./assets/img/icons/sprite.svg#eye-open"></use>
          </svg>
        </span>
      </button>
    </div>
    
    <div class="field-r">
      <button class="field-button" type="button" aria-label="Toggle password visibility">
        <span class="icon" aria-hidden="true">
          <svg class="icon__svg">
            <use xlink:href="./assets/img/icons/sprite.svg#eye-closed"></use>
          </svg>
        </span>
      </button>
      <div class="field-icon">
        <span class="icon" aria-hidden="true">
          <svg class="icon__svg">
            <use xlink:href="./assets/img/icons/sprite.svg#lock"></use>
          </svg>
        </span>
      </div>
    </div>
    
  </div>

  <div class="field-error">
    <span role="alert" id="error-username">Error message</span>
  </div>

</div>
```

**Checkbox**

```twig
{% include '/components/form-fields/form-fields.twig' with
    {
      fieldset: true,
      legend: 'Set of checkboxes',
      type: 'checkbox',
      items: [
        {name: 'not-robot', label: 'I am not a robot', attributes: ''},
        {name: 'not-human', label: 'I am not a human', attributes: ''}
      ]
    } only
%}
```

Output:

```html
<div class="form-field form-field--general">
  <fieldset>

  <div class="field-label">
    <legend>Set of checkboxes</legend>
  </div>

  <div class="field-input">
    <label class="label--checkbox">
      <input type="checkbox" class="sr-only" name="not-robot"> I am not a robot 
      <span class="checkbox" aria-hidden="true">
        <span class="icon" aria-hidden="true">
          <svg class="icon__svg">
            <use xlink:href="./assets/img/icons/sprite.svg#tick"></use>
          </svg>
        </span>
      </span>
    </label>
    <label class="label--checkbox">
      <input type="checkbox" class="sr-only" name="not-human"> I am not a human 
      <span class="checkbox" aria-hidden="true">
        <span class="icon" aria-hidden="true">
          <svg class="icon__svg">
            <use xlink:href="./assets/img/icons/sprite.svg#tick"></use>
          </svg>
        </span>
      </span>
    </label>
  </div>
  
  </fieldset>
</div>
```
