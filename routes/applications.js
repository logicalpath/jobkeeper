
/*
 * GET users listing.
 */

exports.list = function(req, res, next){
  req.db.applications.find().sort({Applied:-1}).toArray(function(error, applications){
    if (error) return next(error);
    res.render('applications', {
      title: 'Job Applications',
      applications: applications || []
    });
  });
};

exports.update = function(req, res, next){
  req.db.applications.updateById(req.application._id, {$set: {Status: req.body.Status === 'expired'}}, function (error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    res.redirect('/applications');
  });
};

