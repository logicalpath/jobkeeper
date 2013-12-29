
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
    req.db.applications.save({
      CompanyName: req.body.CompanyName,
      Position: req.body.Position,
      Applied: new Date(req.body.Applied),
      Status: req.body.Status
      }, function(error, task){
        if (error) return next(error);
	   if (!task) return next(new Error('Failed to save.'));
              res.redirect('/applications');
	   })
};

 
exports.update = function(req, res, next){
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
