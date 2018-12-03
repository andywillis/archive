## Sign-up test

To run the app:

`npm install --production` then `npm run serverprod`

Open on `localhost:3000`.

## Notes

* I used MaterialUI, and React-S3-Uploader as suggested. In addition, I've used Redux to store the signUps locally for the purposes of this test, and react-router for the routing. I used a bespoke build system rather than create-react-app.

* In production I would expect the app to submit the form to a secure server, but this app doesn't submit the test anywhere. Instead, once the submit button has been clicked the UI changes to the list view to see the latest sign-in received.

* I've used JSS to style the components since my signup page used an existing MUI example which uses JSS. My preference would be to use CSS Modules but I didn't want to mix and match CSS methods for this test.

* I've used bundle splitting to separate out the main app code from the vendor code. If you look at the webpack config there's a commented section that also allows us to further split the vendor code down by package. This would allow for greater caching opportunites in production.

* The validation routine could do with a bit more work.

* To run the app in development mode: `npm install && npm run builddev`. This will compile the app and open it on port `8080`.
