## React Router
### By: Alex Sears

<i class="fa fa-github" aria-hidden="true"></i> searsaw



# What is React Router?


A package for managing view changes in a React application using JSX components for expressive routing code.


It functions as a way to show or hide certain components according to what the current URL is. It can also be used to update the URL to transition to new views.



It consists of three different packages, of which we will only be using two.

The base functionality has been put into one package, and the platform specific functionality has been put into two different packages.


## react-router

This is the base package. The other two use this package. It contains the functionality for transitioning between views in a platform agnostic way.


## react-router-dom

This is the routing package made for use in a browser environment. We will be using this one.


## react-router-native

This is the routing package made for use in a mobile environment.



# Components


## BrowserRouter

A router that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.

This is the router we will be using.


## Route

Its most basic responsibility is to render some UI when a location matches the route’s path.

It functions as a show or hide sort of component. If the given route matches the URL, then it shows the component. Otherwise it hides the component.


## Link

Provides declarative, accessible navigation around your application by creating an anchor tag that will update the current URL.


## Switch

Renders the first child Route or Redirect that matches the location.


## Redirect

Rendering a Redirect will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.


## Prompt

Used to prompt the user before navigating away from a page.



# Props


## history

An object that exposes browser history functionality for use cases a Link component can't solve.


## location

Locations represent where the app is now, where you want it to go, or even where it was.


## match

A match object contains information about how a route path matched the URL.
