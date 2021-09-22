// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

$.extend(cur_frm.cscript, {
	onload: function() {
		if(cur_frm.doc.__islocal) {
			cur_frm.set_value("to_currency", frappe.defaults.get_global_default("currency"));
		}
	},

	refresh: function() {
		cur_frm.cscript.set_exchange_rate_label();
	},

	from_currency: function() {
		cur_frm.cscript.set_exchange_rate_label();
	},

	to_currency: function() {
		cur_frm.cscript.set_exchange_rate_label();
	},

	set_exchange_rate_label: function() {
		if(cur_frm.doc.from_currency && cur_frm.doc.to_currency) {
			var default_label = __(frappe.meta.docfield_map[cur_frm.doctype]["exchange_rate"].label);
			cur_frm.fields_dict.exchange_rate.set_label(default_label +
				repl(" (1 %(from_currency)s = [?] %(to_currency)s)", cur_frm.doc));
		}
	}
});

frappe.ui.form.on('Currency Exchange', {
	refresh: function(frm) {
	    frm.add_custom_button(__('ALL KRW Currency KEB'),function(){
            //frappe.msgprint(frm.doc.date);
            let exchange_date = frm.selected_doc.date;
            let from_currency = frm.selected_doc.from_currency;
            let to_currency = frm.selected_doc.to_currency;

            if(to_currency == "KRW"){
				frappe.call({
					method: "erpnext.setup.doctype.currency_exchange.api.get_exchange_rate_all", //dotted path to server method
					args: {
						'exchange_date':exchange_date,
						'from_currency':from_currency,
						'to_currency':to_currency
					},

					callback: function(r) {

						console.log(r)
						// code snippet
						frappe.msgprint({
							title: __('Exchange rate created'),
							message: __('Check exchange rate'),
							indicator: 'orange'
						});


					}
				})
			}
        }, __("Get exchange rate")    );
        frm.add_custom_button(__('Single KRW Currency KEB'),function(){
            //frappe.msgprint(frm.doc.date);
            let exchange_date = frm.selected_doc.date;
            let from_currency = frm.selected_doc.from_currency;
            let to_currency = frm.selected_doc.to_currency;
            var me = this;

            if(to_currency == "KRW"){

            frappe.call({
				method: "erpnext.setup.doctype.currency_exchange.api.get_exchange_rate", //dotted path to server method
				args: {
					'exchange_date':exchange_date,
					'from_currency':from_currency,
					'to_currency':to_currency
				},

				callback: function(r) {

					console.log(r)
					//cur_frm.exchange_rate = r.message.exchange_rate;
					if(r.message) {
						// code snippet
						//frappe.msgprint();
						//frappe.msgprint({
						//	title: __('Exchange rate created'),
						//	message: __('Check exchange rate')+r.message.exchange_rate,
						//	indicator: 'orange'
						//});
						//frm.selected_doc.exchange_rate = r.message.exchange_rate;
						cur_frm.set_value('exchange_rate',r.message.exchange_rate);
						cur_frm.set_value('date',r.message.date);

						return;
						//cur_frm.set_value('exchange_rate',r.message.exchange_rate);
						//cur_frm.exchange_rate = r.message.exchange_rate;

						}
				}
			})
			}
        }, __("Get exchange rate")    );

        frm.add_custom_button(__('Overseas Currency'),function(){
            //frappe.msgprint(frm.doc.date);
            let exchange_date = frm.selected_doc.date;
            let from_currency = frm.selected_doc.from_currency;
            let to_currency = frm.selected_doc.to_currency;


			frappe.call({
				method: "erpnext.setup.doctype.currency_exchange.api.get_exchoverseas", //dotted path to server method
				args: {
					'exchange_date':exchange_date,
					'from_currency':from_currency,
					'to_currency':to_currency
				},

				callback: function(r) {

				console.log(r)
				// code snippet
				frappe.msgprint({
					title: __('Exchange rate created'),
					message: __('Check exchange rate'),
					indicator: 'orange'
					});


				}
			})

        }, __("Get exchange rate")    );


     }
});
