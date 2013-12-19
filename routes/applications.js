
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

