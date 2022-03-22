GFM-Example
===========

GitHub Flavored Markdown Example


Index
---
* source

~~~
 This is head1
 =============

 This is head 2
 --------------
~~~

* result

This is head1
=============

This is head 2
--------------

table (PHP-Markdown style)
---

* source

~~~
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
~~~

* result

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell


* source

~~~
| Item      | Value |
| --------- | -----:|
| Computer  | $1600 |
| Phone     |   $12 |
| Pipe      |    $1 |
~~~

* result

| Item      | Value |
| --------- | -----:|
| Computer  | $1600 |
| Phone     |   $12 |
| Pipe      |    $1 |


code
---

* source


    ```
    this is code block
    ```


* result

```
this is code block
```


* source


    ```ruby
    get '/' do
      "Hello world "
    end
    ```


* result

```ruby
get '/' do
  "Hello world "
end
```


autolink
--------

* source

```
http://mukaer.com
```

* result

http://mukaer.com



strikethrough
-------------

* source

```
this is ~~good~~ bad
```

* result

this is ~~good~~ bad


Task Lists
---------

* source

```
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item
```

* result

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item



superscript
----------

* source

```
this is the 2^(nd) time
```

* result


this is the 2^(nd) time


underline
---------
* source

```
This is _underlined_ but this is still *italic*
```

* result

This is _underlined_ but this is still *italic*


highlight
--------

* source

```
This is ==highlighted==
```

* result

This is ==highlighted==



Index
---

* source

```
```

* result
