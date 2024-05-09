## Warnings

The application works well, however there are 3 things that I would like to mention regarding the application and some issues I encountered:

1.  The application makes use of the local storage which is used to simulate an API call for the user's projects. I wanted to replicate as much as possible a real-life application where everytime the user refreshes, opens a new tab or comes back the next day - one can see the previous projects, since on load the previous projects are loaded from the local storage. The only drawback about this is that the local storage will fill quite quickly due to the canvas drawn images captured from the feed. I have created a global variable in the `main.ts` file `$useLocalStorage` which you can set to `true`(default) or `false` according to your needs. Once you set to `false`, the local storage will never come into play at any point in the application.
2.  When using Pinia store, I am aware that one can easily set the value of a reactive store value through a basic condition, for example: `projectStore.setCurrentProjectId = '123'`. However I find this a bit harder to drill down whenever I want to check some store functionality, especially when multiple store setters are scattered across the code. This is why I use the "Vuex" way to set values in the store. This allows me to debug better and have a better understanding of where the store values are actually being set across the application. I use this together with another global variable called `$debugPinia` which you can also set in `main.ts` which will be exposed in the store. By default this is `true` since the application is in development mode but one can turn it off by setting the value to `false` and the console logs will disappear.
3.  The only technical issue I came across and that I was not able to solve was related to unit test in my application. Cypress seems to not be compatible with Vite versions 5.x+ which I was not aware about when I setup the application the first time. I have then downgraded the Vite versions to 4.x+ and also 3.x+ with the hopes that the Cypress issue I was having is fixed but it was all in vain. I tried some other solutions which led to other issues when initialising my unit tests. Unfortunately it was quite time consuming to solve and was not able to run the unit tests properly to make sure they work. [[This](https://github.com/cypress-io/cypress/issues/25913)] was the issue I was primarily encountering but none of the solutions worked for me. I have "blindly" written the unit tests for all the components from the knowledge that I have since I didn't want to leave it empty, but I have not run them because of this issue.

## Improvements

There are some improvements that I would have done to the application or I would envision to do should I have an extended period of time:

1.  When the captured frame is opened, the image can be zoomed in to analyse it further and better. The user can edge-pan to the sides so that they can view the area in a more-zoomed in fashion.
2.  My initial issue when I started building the application was how I am going to store the frame captured from the feed. My initial idea was to find a way how from the canvas taken from the feed, I can store an image in the `/public` folder which can then be shown accordingly through the path given. As an image inside the `feedFrames[]` array for each project, there would just be a simple ID for example `1234-abcd-5678.png` which I can read off of in the `<img :src="imagePath" />`. However, I wanted to implement a working frame capturing functionality at the start and then see whether I have enough time to implement this solution.
3.  One more improvement I would do is a search on the projects list by name and by tags. It would be great to search by a frame tag and it would pop up the project that contains that particular frame we are searching for.

## Questions

When you are going through the code, more specifically when there are store setters (as discussed in Warnings point 2) you will notice I will always try to deep-copy my arrays and objects so that they lose mutability otherwise, we would be mutating the store value directly. I have always done this throughout the applications I have built across my career and have been shown by other lead and/or senior developer that it is the way how to apply new values to the store. For example:

```sh
// Here we are making a deep-copy of the array and making it immutable
const frames = JSON.parse(JSON.stringify(projectStore.feedFrames))
// We add the tags to the immutable array - the store value does not change here
frames[props.frameIndex].tags.push(tag.value)
// We apply the value to the store with another deep-copy
projectStore.setFeedFramesTaken(JSON.parse(JSON.stringify(frames)), 'file -> components/frame/frame_tags.vue; method -> saveTag()')
// If we apply another change here to frames, the store will be untouched because frames and the store value are not related
frames[props.frameIndex].tags = []
```

My question is: I am very confident about the benefits of applying something similar to this in a large scale application especially when the store is constantly being used and in the current code base where I work at we have a lot of these instances where we would need to further change `frames` above to return something for example. From a developer to another developer, is this the way to go for this kind of functionality? What would be your approach - is this something that you would not accept in a PR for example? I am very willing to learn about what other developers do in their applications, especially ones I am looking forward to work with.

Thanks!
