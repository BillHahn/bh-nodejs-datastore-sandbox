// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = 'bill-hahn-sandbox';

// Instantiates a client
const datastore = Datastore({
  projectId: projectId
});

// [START prodouctQuery]
function searchProduct (productName) {
  const query = datastore.createQuery('Product')
  .filter('name', ">=", productName)
  .filter('name', "<", productName+"~")
  .select('name')
  .order('name', {
    descending: true
  });
  
datastore.runQuery(query)
  .then((results) => {
    // Product entities found.
    const Products = results[0];
    console.log('Product Autocomplete: ');
    Products.forEach((name) => console.log(name));
  });
}
  
require(`yargs`) // eslint-disable-line
  .demand(1)
  .command(
    `autocomplete <productName>`,
    `Lookup product with partial match <Product Name>.`,
    {},
    (opts) => searchProduct(opts.productName)
  )
  .example(`node "Go" returns all products that start with Go*`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/datastore/docs`)
  .help()
  .strict()
  .argv;
