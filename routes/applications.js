
/*
 * GET users listing.
 */

exports.list = function(req, res, next){
  req.db.applications.find().sort({Applied:-1}).toArray(function(err, applications){
    if (err) return next(err);
    res.render('applications', {
      title: 'Job Applications',
      applications: applications || []
    });
  });
};

exports.newapp = function(req, res, next){
    res.render('newapp', {
      title: 'Enter a new Job Application'
    });
};


exports.add = function(req, res, next){
  if (!req.body || !req.body.CompanyName) return next(new Error('No data provided.'));
    console.log("date ",req.body.Applied);
    req.db.applications.save({
      CompanyName: req.body.CompanyName,
      Position: req.body.Position,
      Applied: new Date(req.body.Applied),
      Status: req.body.Status,
      Source: req.body.Source,
      Notes: req.body.Notes,
      Url: req.body.Url,
      ReferredBy: req.body.ReferredBy,
      PhoneInterview: req.body.PhoneInterview,
      InPersonInterview: req.body.InPersonInterview,
      RejectionLetter: req.body.RejectionLetter
      }, function(error, task){
        if (error) return next(error);
	   if (!task) return next(new Error('Failed to save.'));
              res.redirect('/applications');
	   })
};

 
exports.statusupdate = function(req, res, next){
  var mystatus = req.body.Status === 'active' ? 'active':'expired';
  req.db.applications.updateById(req.application._id, {$set: {Status: mystatus }}, function (err, count) {
    if (err) return next(err);
    if (count !==1) return next(new Error('Something went wrong.'));
    res.redirect('/applications');
  });
};


exports.view = function(req, res, next){
  req.db.applications.findOne(req.application._id, function(err, application){
    if (err) return next(err);
    res.render('viewapp', {
      title: 'Job Application',
      application: application 
    });
  });
};


exports.del = function(req, res, next) {
  req.db.applications.removeById(req.application._id, function(error, count) {
    if (error) return next(error);
        if (count !==1) return next(new Error('Something went wrong.'));
           console.info('Deleted job application from  %s with id=%s completed.', req.application.CompanyName, req.application._id);
           res.send(200);
    });
};
