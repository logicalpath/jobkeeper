
exports.add = function(req, res, next){
  if (!req.body || !req.body.CompanyName) return next(new Error('No data provided.'));

    console.log("date ",req.body.Applied);
    var doc = {
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
    };
    console.log(doc.CompanyName);

    req.db.applications.save(doc,
        function(error, task){
        if (error) return next(error);
	   if (!task) return next(new Error('Failed to save.'));
              res.redirect('/applications');
	   })
};

