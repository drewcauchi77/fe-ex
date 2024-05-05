<script setup lang="ts"></script>

<template>
  <section class="dashboard-content q-mt-md q-mx-auto">
    <h1 class="q-mt-none q-mb-md text-center text-h3">Frontend</h1>
    <p class="q-mt-none q-mb-md">
      As an employee working for us, you will be working on the forefront of the AI revolution. Our
      highly collaborative platform allows our customers to accelerate their AI innovations. Making
      computer vision more accessible so everyone can see a smarter world.
    </p>
    <p class="q-mt-none q-mb-md">
      This assignment was designed to test if you have the technical skills to join us. Will you
      pick up the gauntlet and show that you are up for the challenge?
    </p>

    <h2 class="q-mt-lg q-mb-md text-center text-h4">Introduction</h2>

    <h3 class="q-mt-none q-mb-md text-h5">Timeline</h3>
    <p class="q-mt-none q-mb-md">
      You have 1 week from receiving this email to submit your entry. We expect your submission to
      work out of the box. They will be tested in a sandbox environment with the mandatory libraries
      installed
    </p>

    <h3 class="q-mt-none q-mb-md text-h5">Mandatory Files</h3>
    <ol>
      <li>
        <span>README.md</span><br />
        <em>
          This file should be usable by any of our developers to continue working on your
          submission.
        </em>
      </li>
      <li>
        <span>design.md</span><br />
        <em>
          Document the design of your application as if you are writing a proposal for our
          architect.
        </em>
      </li>
      <li>
        <span>Remarks.md</span><br />
        <em>
          If you have any special messages to share with us, perhaps there are things you want to
          warn us about in your application? Things you could not do because you ran out of time? Or
          ... ?
        </em>
      </li>
    </ol>

    <h3 class="q-mt-none q-mb-md text-h5">Mandatory libraries</h3>
    <ul>
      <li>Vue.js 3</li>
      <li>Quasar (nice to have)</li>
      <li>Pinia</li>
      <li>TS</li>
      <li>Cypress</li>
    </ul>

    <h3 class="q-mt-none q-mb-md text-h5">Delivery format</h3>
    <p class="q-mt-none q-mb-md">
      Please use a zip file to bundle your project for uploading (instructions will follow).
    </p>

    <h2 class="q-mt-lg q-mb-md text-center text-h4">Assignment</h2>

    <p class="q-mt-none q-mb-md">
      <em>
        You should assume that this is a feature you are working on that will end up in our product. </em
      ><br /><br />
      Create an application that simulates an inference server. The application should display a
      video stream that can be started & stopped to simulate a camera that is running. Via another
      button the user should be able to capture the current frame. When the user stops the camera
      stream, all the captured frames should be displayed as thumbnails with the possibility to open
      them for further investigation. Additionally, the timestamps of the capture should also be
      visible. We should also be able to add some tags to the thumbnails. Before being able to start
      the video stream, the user should first create a project. Any project that was created
      previously should also be visible, can be opened and deleted.
    </p>
  </section>
</template>

<style scoped lang="scss">
.dashboard-content {
  max-width: 1000px;
}
</style>
