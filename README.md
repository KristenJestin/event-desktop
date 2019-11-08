# Event
Simple event electron + react-js app

[Design](https://www.figma.com/file/QiV8gYbZisQdwdq1wUtmd4/Calendar?node-id=69%3A16)



## Build

#### Start test app
> concurrently "cross-env BROWSER=none yarn react-start" "wait-on http://localhost:3000 && electron ."


#### Build or Release
> yarn react-build && yarn electron-build

> yarn react-build && electron-builder --publish=always