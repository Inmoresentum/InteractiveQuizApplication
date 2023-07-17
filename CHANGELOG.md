# [0.3.0](https://github.com/Inmoresentum/InteractiveQuizApplication/compare/v0.2.0...v0.3.0) (2023-07-17)


### Bug Fixes

* added necessary dependencies ([5913056](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/591305626ee8b652f3d6e8b8bf2cc1b06cdaede2))
* added servlet configuration to upload and download files that are higher than default 512kb ([2a63c7b](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/2a63c7bd41b6ff930606808b35cfcf9f31f9ee03))
* Configured Spring Security to allow FileStorageController to be accessible via outside ([b64a051](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b64a051109a7c35a45de0df2b30182c20b759d4e))
* **eslint:** fixed the issue with the eslint max line count ([effb3f1](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/effb3f115c792e44ad24db02f6dfb6d9e1ae3ff2))
* fixed import alias ([5d62088](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/5d620880f537e219880f4006809613d5715b4235))
* fixed serialization bug on CorrectAnswerSerializer.java ([00d7edc](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/00d7edceccd74c998ff55990207ff4c8fe5a5ddd))
* fixed the data entry issue ([3f73f7f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/3f73f7f4dfd4327ccd190a418678b5f47613d0ff))
* fixed the default alternative env value ([0b17176](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/0b171768f0459d84262ec3cccee2de2f3fa11733))
* fixed the environment variable naming issue on the linux file system ([9d6f643](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/9d6f64366e6770f65273b755269d1de7cbc5c36f))
* fixed the front-end build workflow to be more concise ([524ab57](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/524ab57e985f3ff154842cc3da60519bc8ece1df))
* fixed the issue minio client was not connecting to minio server due to wrong url address ([4ece749](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/4ece7494433392bd27cee2a3e42a10b184ecd816))
* fixed the issue proper props were not being passed ([d0edfdc](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d0edfdc16b6c2fb827a780e1c69693b3fba91d1a))
* fixed the issue with globals.css which occurred due to refactor ([6a8d317](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/6a8d317ca7fdcd21e6be57db4e1684bc30b14021))
* fixed the issue with nextConfig image origins ([6dbb152](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/6dbb152bf776dd8922d504984391369b49b89007))
* fixed the json serialization issue ([36a3f10](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/36a3f10f4a2f8350713c6b7f94377626d586097c))
* got rid of duplicated styles ([9a23834](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/9a238344a582be025a14bf73bf0bafecf7d2c432))
* temporarily fixed dynamic metadata generation ([b1753a5](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b1753a5a3715969668b717031dff05f233932616))
* used de-structuring to get the desired quiz object ([4057b23](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/4057b2315c3461141b0ba32bd2ee8368e094cba9))


### Features

* added data validation for quiz entity ([9ce69c4](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/9ce69c4097057ec77328696fad9bcdc1e0a1b702))
* added default css for quiz components ([ee1de7f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/ee1de7fb9d1b84d6b2dedb1b92b3bbc558aaa8c5))
* added DTOs to effectively transfer data for quizzes ([3ba024e](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/3ba024e2469d813c359355ac5122d90c62c38703))
* added feature for downloading user report csv file ([955b8c8](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/955b8c8a8ecce05d65cd23e7b0f791fe9c180bf7))
* added fetch request to fetch quiz data ([b83db8a](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b83db8a327e0ae9013b9d792d520575269e05281))
* added publicly accessibly quiz api ([d40b4c8](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d40b4c8828b9622f360da507b4ac7e692b2c7c78))
* added the ability to store any kind of files ([dbec2ad](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/dbec2adc2daaff454cafbb4771b3444d36cec534))
* did the basic data modeling for Quiz Entity ([1254318](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/12543189e5de84460ed7f42f21322c0166565d17))
* successfully integrated react-quiz-component with the existing project ([f5ed638](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/f5ed6380077b32546ae20ff6d2fcbf6ae626b829))
* very basic styles to QuizProvider component ([c026df7](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/c026df7c013623e64d33fa9a277b4c98cb61809b))



# [0.2.0](https://github.com/Inmoresentum/InteractiveQuizApplication/compare/v0.1.0...v0.2.0) (2023-07-08)


### Bug Fixes

* added a custom response for AccountRegistration ([678cd09](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/678cd097e9b70e2da02e109e7a5696d2606c6396))
* added custom cursor to the lading page only as it seems to be distracting for pages and workflow. ([d899f3e](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d899f3ea0414efb8a0c0ca7ed883febb809e5494))
* added custom message for bad credential for authentication endpoint ([0286d0f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/0286d0fa407b6f760986c9f694620b97b7096203))
* added the logo create by Nuraiya to Footer.jsx as well. ([f6df5d9](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/f6df5d96e6667039a366768511764d4e9f86a7cd))
* also added logo to the responsive mobile view. ([9948f85](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/9948f859601d0ebcf22200e411d35d399fdd5439))
* fixed an issue with the p tag's padding ([83d9caf](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/83d9caf982e0a2b09cd3341dc3f93d9b65fb635a))
* fixed email formatting issue where the anchor tag was left empty ([a4e8d3f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/a4e8d3f0d51f2087564e9bd7c5fd6afc7de0e42b))
* fixed Question Entity issue with the builder pattern ([bb49707](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/bb49707516c000fdfc13df8c9c90b9e0095fe326))
* fixed some visual glitches and improved css animation performance and added more fields ([bd53c6b](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/bd53c6b587f5504407d3b5bf2f65a8b4c869d35e))
* fixed the error message issue with next-auth :alien: ([8d81239](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/8d81239746fae619b3d2ae98c9b7fe9dc6eda807))
* fixed the issue unable to add meta-data due to client component by adding an layout ([66f2f0c](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/66f2f0ce06c44db6d3d54e7760418c0ce6b6e01e))
* fixed the issue where favicon.ico provided by Nuraiya was not displaying properly. ([bb5f01b](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/bb5f01b01b2fbb1f0d2b94bcd5f05ed7e599db61))
* fixed the issue where next/link was pointing older urls ([ec070c2](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/ec070c2edcac6e624f4f2b123a71cc5a880db364))
* fixed the issue where sample data was not being inserted correctly. ([6425d76](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/6425d76a12535b8b4fa5c18e0ba9547f07600e03))
* fixing email verification flow (backend) ([6673487](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/6673487bc1cdd8c12a086d379cd02ad92ecb99ed))
* got rid global body selector and scoped styles to their own page for now ([434aa90](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/434aa905e3a8f3af17f3c1ac9ab24c03775f2f3b))
* got rid of comment that was causing the issue ([d7cf4f3](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d7cf4f3889cbab7a8ff69aee7db331ba200166bb))
* moved next-auth from pages directory to new app directory ([e1382e9](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/e1382e946e64924e10ad03f140d462b15130de3f))
* updated AuthenticationResponse so that clients can better understand the state of the api response. ([122677d](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/122677d9055f3838c7d0edacffb2d989cb8f1f6b))


### Features

* added a basic registration form ([b90224a](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b90224ae907eda7e113438b20384552d20754e4f))
* added a CustomCursor.jsx which creates a nice looking rounded custom cursor for the lading page only. ([b9fe78f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b9fe78fec0e4fcf9550965c70120c5fcec77520d))
* added account verification via email [backend] ([b4c3b05](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b4c3b05b22910437b5e5646c5df152dc20da19ee))
* added cors and necessary configuration in the controller. ([d6ea694](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d6ea6942c47dc442e716252acea00c74e52cd69a))
* added custom account registration email template which has more styles and looks better overall. ([f1392fa](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/f1392fa1410ad6c74d2a21f45a0f13b15bc9c65e))
* added IP-based filtering ([1d60204](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/1d602049565c740f902f3d5dc4f93496c95b08d4))
* added re-usable custom quiz components ([c9992e5](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/c9992e5c026e967fb850ed4f4149098357d270ff))
* added the logo in the `Navbar.jsx` along with some animation and hover effects. ([ab18194](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/ab1819477ed5eed2a6c76c304d85181979131af0))
* created a very basic attractive looking glassmorphic login form ([ceca240](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/ceca240b02318db29456c18b30c3642cd76b074a))
* migrated to server side authentication ([3331ea3](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/3331ea3ab88774653937cbc6debd11905d4483e0))
* mode the login card draggable using framer motion. ([6057c51](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/6057c51479e4f409a2d19567736701ba71c61011))



# [0.1.0](https://github.com/Inmoresentum/InteractiveQuizApplication/compare/f0da586fcf5ee237d8d3626203dea5c70f86595d...v0.1.0) (2023-07-07)


### Bug Fixes

* added custom permission ([ea04b3e](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/ea04b3ea7a607a1d1eaa87d641305656f7eeab09))
* changed the group id from starter given default to our own. ([d2b075f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d2b075f2e246cdc80f06892b176a6bd8d70cf336))
* changed the triggering to tag push ([2fcac0a](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/2fcac0af3878bcbe6698ca320142638364cb1268))
* fixed indentation related issue. ([f0da586](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/f0da586fcf5ee237d8d3626203dea5c70f86595d))
* getting rid of wrong triggering issue ([d8ae3ca](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d8ae3ca1820746e6967b2b2b1599f4a7c4e2f277))
* **README:** fixed the indentation issue ([4da2c02](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/4da2c02aaea894ee34ea26ad6b11cd8a23befb09))
* updated the triggering actions and manually creating adding tag ([947e49a](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/947e49adfe991bd426bd7e67a8be1994ebca86e3))


### Features

* added custom styles to `Testimonial.jsx` and added wavy sections. ([23b0795](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/23b0795dea3973a550e689a4208f1866352f1101))
* added NextJS frontEnd. ([d3ae39b](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d3ae39b9ecf59586132fb559ec6f3fdee46ad74e))
* added SEO(search engine optimization). ([b03854c](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b03854c3ca7a4ff09712a3ae59fe00235600ad1b))
* added special hover effect on the premium section h1. ([fa9bcc9](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/fa9bcc999b4f36cf4eeb014628751dba7744d540))
* Added the ability to add new quizzes. ([60892de](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/60892de80542c245f159ba930bca616f3d61d271))
* added translation effect on the Anchor tag. ([01e1cb9](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/01e1cb9d15ed925e904e1f8f3d54cb554aa22957))



