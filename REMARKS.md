## Warnings

The application functions effectively, but I'd like to address three points regarding its operation and the challenges I've faced:

1. Local Storage Utilisation: The application simulates API calls using local storage to preserve user projects. This ensures that previously saved projects are readily accessible upon reloading the application, opening a new tab, or returning on subsequent days. A potential downside is that local storage may quickly become saturated due to the volume of canvas-drawn images. A global variable `$useLocalStorage` in `main.ts` allows toggling this feature on (`true` by default) or off (`false`), which disables local storage completely.
2. State Management with Pinia: Although setting a reactive store value in Pinia, like `projectStore.setCurrentProjectId = '123'`, is straightforward, tracking changes can become complex with scattered setters throughout the code. Adopting a Vuex-like methodology aids in debugging and understanding the distribution of store value assignments. This approach is facilitated by another global variable, `$debugPinia`, set in `main.ts`. It is enabled (`true`) by default in development mode but can be disabled (`false`) to suppress console logs.
3. Unit Testing Issues: Compatibility problems with Cypress and Vite versions 5.x+ were initially unnoticed, prompting a downgrade to versions 4.x+ and 3.x+, which did not resolve the issue. Alternative solutions were explored, but they too introduced new complications, rendering it impossible to implement unit tests within the allocated timeframe. This issue was only resolved on the evening of Wednesday (08/05), leaving insufficient time before the deadline on Friday morning (10/05) to address remaining tasks. More details on the encountered issue can be found [[here](https://github.com/cypress-io/cypress/issues/25913)].

## Improvements

Given more time, several enhancements could be considered:

1. Enhanced Image Interaction: Introducing the ability to zoom into a captured frame would allow for more detailed analysis. Users could pan to view different sections of the image more closely by edge-panning.
2. Image Storage: Initially, I considered saving images captured from the canvas feed directly into the `/public` folder, accessible via a specified path. Images would be identified by a unique filename in the `feedFrames[]` array of each project, e.g., `1234-abcd-5678.png`. However, due to time constraints, I prioritised establishing basic frame capture functionality.
3. Project Search Feature: Adding a search functionality to the project list by name and tags would significantly enhance user experience. This would allow users to quickly locate projects containing specific tagged frames.

## Questions

In the provided code, you'll notice I often use deep copying for arrays and objects to prevent direct mutation of store values. This practice, which I've consistently applied in my development career, has been reinforced by senior developers as a best practice. Here's how it typically works:

```sh
// Deep copy of the array to ensure immutability
const frames = JSON.parse(JSON.stringify(projectStore.feedFrames))
// Adding tags to the immutable array - the store value remains unchanged
frames[props.frameIndex].tags.push(tag.value)
// Applying the updated value back to the store with another deep copy
projectStore.setFeedFramesTaken(JSON.parse(JSON.stringify(frames)), 'file -> components/frame/frame_tags.vue; method -> saveTag()')
// Any subsequent modification to 'frames' does not affect the original store value
frames[props.frameIndex].tags = []
```

I believe this approach is beneficial, particularly in large-scale applications with frequent store usage. I would appreciate your insights on this methodology. Would this approach be acceptable in a pull request, or do you recommend an alternative strategy? I am eager to learn from other developers, especially those in teams I aspire to join.

Thank you for your time!
