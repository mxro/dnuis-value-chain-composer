// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/value-chain-data-js-0.0.1 -->

(function($, AJ) {

	$.initValueChainData = function(params) {

		// final parameters
		var session = params.session;

		// constants ------
		var typesRoot = "http://slicnet.com/mxrogm/mxrogm/apps/nodejump/docs/8/n/Types/";
		var aValueChainQuestion = session.node(typesRoot
				+ "Value_Chain_Question");
		var aBrandName = session.node(typesRoot + "Brand_Name");
		var aBrandImage = session.node(typesRoot + "Brand_Image");
		var aBrandVideo = session.node(typesRoot + "Video_Link");
		var aValueChainActivitiesList = session.node(typesRoot
				+ "Value_Chain_Activites");
		var aJustification = session.node(typesRoot + "Justification");
		var aName = session.node(typesRoot + "Name");
		var anUPI = session.node(typesRoot + "UPI");

		var qd = {};

		qd.submitQuestion = function(data, onSuccess) {

			qd.priv.prepareSeedNodeForQuestion(data, onSuccess);

		};

		qd.loadQuestion = function(node, secret, onSuccess) {

			var brandName = node.select(aBrandName)
			var brandImage = node.select(aBrandImage);
			var brandVideo = node.select(aBrandVideo);
			var justification = node.select(aJustification);
			var selectedActivites = node.select(aValueChainActivitiesList);
			var upi = node.select(anUPI);
			var name = node.select(aName);
			
			session.getAll(brandName, brandImage, brandVideo, justification,
					selectedActivites, upi, name, function() {
						var data = {};
						data.brandName = brandName.get().value();
						data.imageLink = brandImage.get().value();
						data.videoLink = brandVideo.get().value();
						data.justification = justification.get().value();
						data.selectedActivites = selectedActivites.get()
								.value();
						
						if (upi.get()) {
							data.upi = upi.get().value();
						}
						if (name.get()) {
							data.name = name.get().value();
						}

						onSuccess(data);
					});

		};

		qd.updateQuestionData = function(node, secret, data, onSuccess) {

			node.select(aBrandName).setValue(data.brandName);
			node.select(aBrandImage).setValue(
					data.imageLink);
			node.select(aBrandVideo).setValue(
					data.videoLink);
			node.select(aValueChainActivitiesList)
					.setValue(data.selectedActivites);
			node.select(aJustification).setValue(
					data.justification);
			
			var upi = node.select(anUPI);
			
			var name = node.select(aName);
			
			session.getAll(upi, name, function() {
				if (upi.get()) {
					upi.setValue(data.upi);
				}
				
				if (name.get()) {
					name.setValue(data.name);
				}
				
				session.commit().get(function(success) {
					
					
					
					onSuccess();
				});
			});

		}

		qd.priv = {};

		qd.priv.prepareSeedNodeForQuestion = function(data, onSuccess) {
			session.seed().get(
					function(node) {
						node.appendSafe("q", "./q").get(
								function(questionNode) {
									qd.priv.writeQuestionDataToNode(
											questionNode, node.getSecret(),
											data, onSuccess);
								});
					});

		};

		/**
		 * Write to a node all the data defining a strategy quadrant question.
		 */
		qd.priv.writeQuestionDataToNode = function(node, secret, data,
				onSuccess) {

			node.append(aValueChainQuestion);
			node.append(data.brandName, "./brandName").append(aBrandName);
			node.append(data.imageLink, "./brandImageLink").append(aBrandImage);

			node.append(data.videoLink, "./brandVideoLink").append(aBrandVideo);
			node.append(data.selectedActivites, "./selectedActivites").append(
					aValueChainActivitiesList);
			node.append(data.justification, "./justification").append(
					aJustification);
			node.append(data.upi, "./upi").append(anUPI);
			node.append(data.name, "./name").append(aName);

			session
					.commit().get(function(success) {

						onSuccess(node, secret);

						session
								.post(node.uri() + "&" + secret,
										"http://slicnet.com/questio/questio",
										"pc1aj8opxtdjk19")
								.get(
										function(success) {
											AJ.ui
													.notify(
															"Last Status: Question posted for review.",
															"alert-success");
										});
					});

			

		};

		return {
			submitQuestion : qd.submitQuestion,
			loadQuestion : qd.loadQuestion,
			updateQuestion : qd.updateQuestionData
		};
	};

})(jQuery, AJ);

// <!-- one.end -->
