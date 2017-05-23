// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = 'bill-hahn-sandbox';

// Instantiates a client
const datastore = Datastore({
  projectId: projectId
});

// The kind for the new entity
const kind = 'Product';
// The name/ID for the new entity
const sku = '1004806';
// The Cloud Datastore key for the new entity
const productKey = datastore.key([kind, sku]);

// Prepares the new entity
const product = {
  key: productKey,
  data: {
    sku: 1004806,
    name: "Apple iPad",
    price: 199.99
  }
};

// Saves the entity
datastore.save(product)
  .then(() => {
    console.log(`Saved ${product.key.name}: ${product.data.name}`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });