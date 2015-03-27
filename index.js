var config = require('./config');
var zc = require('zencoder')(config.api_key);

function EventHandler(event, context) {
  this.context = context;
  this.bucket = event.Records[0].s3.bucket.name;
  this.key = event.Records[0].s3.object.key;

  this.submitZencoderRequest();
}

EventHandler.prototype.createRequestBody = function() {
  var request = {
    input: 's3://'+ this.bucket +'/'+ this.key,
    outputs: [
      {
        label: 'mp4',
        width: 540,
        url: 's3://'+ this.bucket +'/outputs/'+ this.key +'/'+ this.key +'.mp4'
      },
      {
        label: 'webm',
        width: 540,
        url: 's3://'+ this.bucket +'/outputs/'+ this.key +'/'+ this.key +'.webm'
      }
    ]
  };

  return request;
};

EventHandler.prototype.submitZencoderRequest = function() {
  var ctx = this.context;

  zc.Job.create(this.createRequestBody(), function(err, job) {
    if (err) {
      console.error(err);
      return ctx.done(err);
    }

    ctx.done(null, job.id);
  });
};

exports.handler = function(event, context) {
  return new EventHandler(event, context);
};
