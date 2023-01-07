In this project, we are using Handlebarsjs as an HTML template engine. In this tutorial, we are going to cover the basics functionality of handlebarsjs. To learn more
on handlebarsjs please visit [link](https://handlebarsjs.com/)

## What is Handlebars?

Handlebars is a simple templating language.

It uses a template and an input object to generate HTML or other text formats. Handlebars templates look like a regular text with embedded Handlebars expressions.

#### template

```html
<p>{{firstname}} {{lastname}}</p>
```

A handlebars expression is a `{{`, some contents, followed by a `}}`. When the template is executed, these expressions are replaced with values from an input object.

If applied to the input object

```js
{
  firstname: "Yehuda",
  lastname: "Katz",
}
```

the expressions will be replaced by the corresponding properties. The result is then

```html
<p>Yehuda Katz</p>
```

### Nested input objects

Sometimes, the input objects contain other objects or arrays. For example:

```js
{
  person: {
    firstname: "Yehuda",
    lastname: "Katz",
  },
}
```

In such a case, you can use a dot-notation to gain access to the nested properties

```
{{person.firstname}} {{person.lastname}}
```

### Built-in Helpers

### #if

You can use the `if` helper to conditionally render a block. If its argument returns `false`, `undefined`, `null`, `""`, `0`, or `[]`, Handlebars will not render the block.

```html
<div class="entry">
  {{#if author}}
  <h1>{{firstName}} {{lastName}}</h1>
  {{/if}}
</div>
```

When you pass the following input to the above template

```js
{
  author: true,
  firstName: "Yehuda",
  lastName: "Katz",
}
```

This will produce the result as below:

```html
<div class="entry">
  <h1>Yehuda Katz</h1>
</div>
```

f the input is an empty JSONObject `{}`, then `author` will become `undefined` and `if` condition fails, resulting in the output as follow:

```html
<div class="entry"></div>
```

When using a block expression, you can specify a template section to run if the expression returns a false value. The section, marked by `else` is called an "else section".

```html
<div class="entry">
  {{#if author}}
  <h1>{{firstName}} {{lastName}}</h1>
  {{else}}
  <h1>Unknown Author</h1>
  {{/if}}
</div>
```

### #unless

You can use the `unless` helper as the inverse of the `if` helper. Its block will be rendered if the expression returns a false value.

```html
<div class="entry">
  {{#unless license}}
  <h3 class="warning">WARNING: This entry does not have a license!</h3>
  {{/unless}}
</div>
```

If looking up `license` under the current context returns a false value, Handlebars will render the warning. Otherwise, it will render nothing.

### #each

You can iterate over a list using the built-in each helper. Inside the block, you can use this to reference the element being iterated over.

```html
<ul class="people_list">
  {{#each people}}
  <li>{{this}}</li>
  {{/each}}
</ul>
```

when used with this context:

```html
{ people: [ "Yehuda Katz", "Alan Johnson", "Charles Jolley", ], }
```

will result in:

```html
<ul class="people_list">
  <li>Yehuda Katz</li>
  <li>Alan Johnson</li>
  <li>Charles Jolley</li>
</ul>
```

You can use the `this` expression in any context to reference the current context.

You can optionally provide an `else` section which will display only when the list is empty.

```
{{#each paragraphs}}
<p>{{this}}</p>
{{else}}
<p class="empty">No content</p>
{{/each}}
```

When looping through items in each, you can optionally reference the current loop index via `{{@index}}`

```js
{{#each array}} {{@index}}: {{this}} {{/each}}
```

Additionally for object iteration, `{{@key}}` references the current key name:

```js
{{#each object}} {{@key}}: {{this}} {{/each}}
```

The first and last steps of iteration are noted via the `@first` and `@last` variables when iterating over an array.

Nested `each` blocks may access the iteration variables via depth-based paths. To access the parent index, for example, `{{@../index}}` can be used.

### #with

The `with` -helper allows you to change the evaluation context of template-part.

```js
{{#with person}}
{{firstname}} {{lastname}}
{{/with}}
```

when used with this context:

```js
{
  person: {
    firstname: "Yehuda",
    lastname: "Katz",
  },
}
```

will result in:
`Yehuda Katz`
`with` can also be used with block parameters to define known references in the current block. The example above can be converted to

```js
{{#with city as | city |}}
  {{#with city.location as | loc |}}
    {{city.name}}: {{loc.north}} {{loc.east}}
  {{/with}}
{{/with}}
```

Which allows for complex templates to potentially provide clearer code than `../` depthed references allow for.

You can optionally provide an `{{else}}` section which will display only when the passed value is empty.

```js
{{#with city}}
{{city.name}} (not shown because there is no city)
{{else}}
No city found
{{/with}}
```

```js
{
  person: {
    firstname: "Yehuda",
    lastname: "Katz",
  },
}
```
