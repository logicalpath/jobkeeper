
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
  var mystatus = req.body.Status === 'active' ? 'active':'expired';
  console.log("mystatus is ",mystatus);
  req.db.applications.updateById(req.application._id, {$set: {Status: mystatus }}, function (error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    res.redirect('/applications');
  });
};



// class=(application.Status =='active')? 'activeClass':'expiredClass'
