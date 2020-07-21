# Alers

## Usage

### Required settings

```twig
{% include "/components/alerts/alerts.twig" with 
		{
			text: 'Text of the alert'
		} only
%} 

```

Parameters:

- `text`: text of the alert. Be careful with tags (```<strong></strong>```, ```<em></em>```, etc.) because it will break the text into multiple parts in some screenreaders.

Output:

```html
<div class="alert" role="status" aria-live="polite" >Text of the alert</div>
```


### Optional settings

```twig
{% include "/components/alerts/alerts.twig" with 
		{
			text: 'Text of the alert',
			role: 'alert',
			icon: 'tick',
			style: 'danger',
			fullwidth: true,
			class: 'js-alert',
			attributes: 'data-toggle="form-alert"'
		} only
%} 
```

Parameters:

- `role`: set `alert` if needed. `status` will be applied by default.
- `icon`: name of the icon from `src/assets/img/icons/src/` folder.
- `style`: you can colorize a button by adding any name from your default color scheme. Alert is not that much complicated object, but make sure you add some styles too if you need.
- `fullwidth`: if `true`, alert will get the full width of its parent container
- `class`: any additional classes.
- `attributes`: any additional attributes.

Output:

```html
<div class="alert alert--danger alert--has-icon alert--fullwidth js-alert" role="alert" aria-live="assertive" data-toggle="form-alert">
	<span class="icon">
		<svg class="icon__svg">
			<use xlink:href="./assets/img/icons/sprite.svg#tick"></use>
		</svg>  
	</span>
	Text of the alert
</div> 
```
