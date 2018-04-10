const axios = require('axios')
const fs = require('fs')
const netrc = require('netrc')
const os = require('os')
const path = require('path')
const host = 'api.storyblok.com'

const args = process.argv
let space = ''
args.forEach((arg) => {
  if (arg.startsWith('--space')) {
    space = arg.replace('--space=', '')
  }
}) 

let version_folder = {"story":{"name":"v1","slug":"v1","is_folder":true,"parent_id":"0","default_root":"doc"}}
let category_folder = {"story":{"name":"Your Category","slug":"your-category","is_folder":true,"parent_id":"PARENT_ID","default_root":"doc"}}
let first_entry = {"story":{"name":"First Entry","slug":"first-entry","parent_id":"PARENT_ID","content":{"component":"doc","content":"Let's get you started with NuxtDoc in just a couple of minutes.\n\n## Environment Setup\n### Fork the source\n\nNavigate to our [Github Repository](https://github.com/storyblok/nuxtdoc) and fork it into your repositories.\n\n### Checkout the source\n\n```\ngit clone git@github.com:YOUR_GITHUB_PROFILE/nuxtdoc.git \n```\n\n### Install dependencies\n\n```\nnpm install \n## or\nyarn\n```\n\n## Storyblok\n\n### Install the Storyblok CLI\n\n```\nnpm install -g storyblok\n```\n\n### Start the CLI\n\nBy executing the following command you will be able to login/register to Storyblok and directly create a new Space from your command line.\n\n```\nstoryblok\n```\n\n### Seed components\n\nStoryblok allows you to create components and content-types however you like. NuxtDoc ships with predefined components which you can customize. To give you a quick start we can use the Storyblok CLI to upload the initial version of components.\n\n```\nstoryblok push-components --space=YOUR_SPACE_ID seed.components.json\n```\n\n### Seed content\n\nThe Nuxt setup of NuxtDoc follows a specific routing to also give you a quick head-start you can simply execute the following command to create some seed content and the basic folder structure in Storyblok for you.\n\n```\nnode seed.js --space=YOUR_SPACE_ID\n```\n\n### Exchange access token\n\nExchange the access token in the `nuxt.config.js` with your own Storyblok `preview token`. You can find that in your space dashboard.\n\n## Netlify\n\n### Install the Netlify CLI\n\nTo finally deploy the NuxtDoc and share it with your customers and/or community all we have left is to install the Netlify CLI:\n\n```\nnpm install netlify-cli -g\n```\n\n### Nuxt Generate \n\nBefore we deploy we will have to generate the routes and build your NuxtDoc project.\n\n```\nnpm run generate\n```\n\n### Deploy on Netlify\n\nExecute the command below to create your Netlify account and directly upload your project, you will need to choose the `dist` folder to\n\n```\nnetlify deploy\n```\n\n### Speed up deployment\n\nTo speed up your deployment you can also use a custom script as we ship it directly for you in the NuxtDoc package.json, all you need to do to generate your nuxt project and deploy it on Netlify is the following:\n\n```\nnpm run deploy\n```"}}}

let home = process.env[(/^win/.test(process.platform)) ? 'USERPROFILE' : 'HOME']
let credsNetrc = netrc(path.join(home, '.netrc'))
let creds = {}

if (credsNetrc.hasOwnProperty(host)) {
  creds = {
    'email': credsNetrc[host]['login'],
    'token': credsNetrc[host]['password']
  }
  
  startSeed()

} else {
  console.error('Seed: You\'re not logged in. Use the command `storyblok login` to login')
}

async function startSeed() {
  const instance = axios.create({
    baseURL: `https://mapi.storyblok.com/v1/spaces/${space}`,
    headers: {
      'Authorization': creds.token
    }
  })

  // 1. Verison Folder: create the basic folder structure
  let res_1 = await instance.post(`/stories`, version_folder).catch((error) => console.error(error))
  console.log('Seed: Version Folder created')
  category_folder.story.parent_id = res_1.data.story.id
  

  // 2. Category Folder: create the basic folder structure
  let res_2 = await instance.post('/stories', category_folder).catch((error) => console.error(error))
  console.log('Seed: Category Folder created')

  // 3. Create First Entry to showcase the setup
  first_entry.story.parent_id = res_2.data.story.id
  let res_3 = await instance.post('/stories', first_entry).catch((error) => console.error(error))
  console.log('Seed: First Entry created')

  // 4. Fill Home content entry with base data from NuxtDoc
  let res_4 = await instance.get('/stories/', { page: 1 })
  let homeStory = res_4.data.stories.find((story) => {
    return story.slug == 'home';
  });
  homeStory.path = '/'
  homeStory.content = {"body":[{"_uid":"43bccb44-f03b-4f06-8515-06b4025bc3d5","title":"NuxtDoc","subtitle":"Create your documentation with NuxtJS + Storyblok","component":"teaser","button_link":{"id":"63f075f9-5f02-4805-a3af-2cb84f5b7aeb","url":"","linktype":"story","fieldtype":"multilink","cached_url":"v1/your-category/first-entry"},"button_text":"Get me to the Docs","background_image":"//a.storyblok.com/f/43760/2000x500/3afb2b33d7/nuxtdoc-background.svg"},{"columns":[{"link":{"id":"ef631e21-b771-49f4-a486-69efff85a643","url":"","linktype":"story","fieldtype":"multilink","cached_url":"v1/your-category/first-entry"},"logo":"//a.storyblok.com/f/43760/256x189/97266889fd/nuxt.svg","name":"Built with Nuxt","component":"feature","link_text":"Why Nuxt?","description":"Nuxt.js is a framework for creating Universal Vue.js Applications. It presets all the configuration needed to make your development of a Vue.js Application Server Rendered more enjoyable."},{"link":{"id":"4a971857-f1be-4708-b2ae-e401c1f30445","url":"","linktype":"story","fieldtype":"multilink","cached_url":"v1/your-category/first-entry"},"logo":"//a.storyblok.com/f/43760/187x217/ff47150545/storyblok.svg","name":"Content with Storyblok","component":"feature","link_text":"Why Storyblok?","description":"CMS done right. API based & Headless with clean and structured JSON for you as developer and a CMS your editors will fall in love with. Unlimited extensibility through custom plugins using VueJs."},{"link":{"id":"daa26172-db21-4026-abd0-8e5d7adf529d","url":"","linktype":"story","fieldtype":"multilink","cached_url":"v1/your-category/first-entry"},"logo":"//a.storyblok.com/f/43760/256x256/d78f9d9b8c/netlify.svg","name":"Deploy with Netlify","component":"feature","link_text":"Why Netlify?","description":"Build, deploy, and manage modern web projects. Get an all-in-one workflow that combines global deployment, continuous integration, and HTTPS."}],"component":"grid"}],"component":"page"}

  let res_5 = await instance.put(`/stories/${homeStory.id}`, { story: homeStory }).catch((error) => console.error(error))
  console.log('Seed: Home Content Entry configured')

  // 5. Configure Space with correct preview Domain
  let { data } = await instance.get().catch((error) => console.error(error))
  data.space.domain = 'http://localhost:3000/'

  let final_result = await instance.put('/', data).catch((error) => console.error(error))
  console.log('Seed: Space configured')
  console.log('');
  console.log('Your preview token is: ' + final_result.data.space.first_token);
  console.log('Exchange it in your `nuxt.config.js` to continue');
}