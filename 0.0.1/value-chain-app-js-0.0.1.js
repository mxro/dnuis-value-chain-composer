// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/value-chain-app-js-0.0.1 -->
(function($) {

		$.initValueChainApp = function(params) {

			var qc = {};
			
			var elem = params.elem;
			var session = params.session;
			
			qc.sf = null;
			qc.sd = null;
			
			qc.hide = function() {
				elem.hide();
			};
			
			qc.show = function() {
				elem.show();
			};
			
			qc.sd = $.initValueChainData({session: session});
			
			qc.sf = $.initValueChainQuestionForm({
				elem : $(".valueChainQuestionForm", elem),
				onSubmit: function(res) {
					AJ.ui.showProgressBar();
					qc.sf.hide();
					$('.submitButtonRow', elem).hide();
					
					qc.sd.submitQuestion(res, function(node, secret) {
						AJ.ui.hideProgressBar();
						
						$('.questionLink', elem).attr('href', "http://appjangle.com/view#"+node.uri()+"&"+secret);
						$('.successMessage', elem).fadeIn();
					});
				}
			});
			
			
			// init UI
			(function() {
				$('.submitButtonRow', elem).show();
				
				qc.sf.newQuestion();

				
				$('.contributeAnotherQuestionButton', elem).click(function(evt) {
					evt.preventDefault();
					
					$('.successMessage', elem).hide();
					
					$('.submitButtonRow', elem).show();
					qc.sf.newQuestion();
				});
				
				$('.submitButton', elem).click(function(evt) {
					qc.sf.submit();
				});
				
				
				session.catchExceptions(function(er) {
					AJ.ui
					.notify(
							"An unexpected error occured: ["+er.message+"]\n"+"   Caused by: ["+er.origin+"]",
							"alert-error");
				});
				
			}) ();
			
			
			
			return {
				show: qc.show,
				hide: qc.hide
			};
		};

	})(jQuery);

// <!-- one.end -->
