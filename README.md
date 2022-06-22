# TrafficGUI frontend baseline

This is the baseline for making frontend apps, using TypeScript and React.

The application is running at [trafficgui-frontend-baseline.trafficgui.vydev.io](https://trafficgui-frontend-baseline.trafficgui.vydev.io). There are also [test](https://trafficgui-frontend-baseline.test.trafficgui.vydev.io) and [staging](https://trafficgui-frontend-baseline.stage.trafficgui.vydev.io) environments available.

If you want to create a new application based on the baseline, read more about [how to use the template](https://github.com/nsbno/trafficgui-frontend-baseline/blob/master/docs/use-template.md).

The project was bootstrapped with Create React App. See a description of [how to use the provided scripts](https://github.com/nsbno/trafficgui-frontend-baseline/blob/master/docs/create-react-app.md).

## Concepts

### remoteData and remoteAction

`useRemoteData` and `useRemoteAction` are two hooks that deals with fetching and posting data to and from the backend.

The most important part of these two hooks are a union type, which describes all possible states for the interaction with the backend. This gives you full control over what's happening, and forces you to handle all cases with async actions when rendering a view.

Another important concept is that the union type only holds the data associated with the current state, and prevents you from accessing values not present in the current state.

_Note: Both of these should be adapted to the needs of the app they are used in._

Inspired by: http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html

#### RemoteData

`useRemoteData` is used for _fetching_ data _from_ the backend, and has the following states:

```ts
export type RemoteData<ResponseValueType, ErrorType> =
  | NotAsked
  | Loading
  | Success<ResponseValueType>
  | Failure<ErrorType>
  | ShouldRefresh<ResponseValueType>
  | Refreshing<ResponseValueType>;
```

Notes for some of the states:

- `NotAsked` allows you to handle the case of what to render before your request to the backend has been sent.
- `ShouldRefresh` and `Refreshing` keeps the previous fetched data, and allows you to show this while fetching the updated data.

_TODO: Point to example use in app_

#### RemoteAction

`useRemoteAction` is used for _sending_ data _to_ the backend, and has the following states:

```ts
export type RemoteAction<
  BodyType,
  ParametersType,
  ResponseValueType,
  ErrorType
> =
  | Loading<BodyType, ParametersType>
  | Success<BodyType, ParametersType, ResponseValueType>
  | Failure<BodyType, ParametersType, ErrorType>
  | Refresh<BodyType, ParametersType, ResponseValueType>;
```

One thing to note with the current implementation is that is based on a list of requests, which makes it useful for working with parallel requests in lists. For example checkboxes in a table view. It includes a `send` and a `get` method which takes a `key` argument that allows you to differ between requests.

_TODO: Point to example use in app_
