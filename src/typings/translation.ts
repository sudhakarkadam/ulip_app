export type Keys =
  | "accept.terms"
  | "account"
  | "accounts"
  | "add.now"
  | "add.warehouse"
  | "address"
  | "are.you.sure"
  | "capture.pop"
  | "choose.language"
  | "choose.lsp"
  | "choose.reason"
  | "choose.truck"
  | "choose.unit"
  | "city"
  | "close"
  | "company.name"
  | "company.setup"
  | "confirm"
  | "container"
  | "continue"
  | "create.trip"
  | "current.profile"
  | "destination.point"
  | "details"
  | "do.not.have.ewb"
  | "does.not.exist"
  | "driver.details"
  | "driver.name"
  | "error"
  | "errors.address"
  | "errors.city"
  | "errors.ewb.act_from_state_code"
  | "errors.ewb.consignor_pincode"
  | "errors.ewb.delivery_pincode"
  | "errors.ewb.from_state_code"
  | "errors.ewb.hsn_code"
  | "errors.ewb.invoice_date"
  | "errors.ewb.invoice_number"
  | "errors.ewb.password"
  | "errors.ewb.recipient_gstn"
  | "errors.ewb.ship_to_state"
  | "errors.ewb.supplier_gstn"
  | "errors.ewb.to_state_code"
  | "errors.ewb.total_value"
  | "errors.ewb.transactionType"
  | "errors.ewb.transaction_sub_type"
  | "errors.ewb.transporter_id"
  | "errors.ewb.username"
  | "errors.ewb.vehicle_number"
  | "errors.gpsId"
  | "errors.gpsVendor"
  | "errors.gstin"
  | "errors.gstin.invalid"
  | "errors.location"
  | "errors.name"
  | "errors.pinCode"
  | "errors.regNumber"
  | "errors.regNumber.maxlength"
  | "errors.state"
  | "errors.truckName"
  | "errors.truckNumber"
  | "errors.truckNumberInvalid"
  | "errors.truckType"
  | "errors.warehouseName"
  | "eway.error"
  | "eway.loading"
  | "eway.password"
  | "eway.pending"
  | "eway.success"
  | "eway.username"
  | "failed.to.fetch.trip.details"
  | "from"
  | "generate.ewb"
  | "go.back"
  | "go.to.map"
  | "gps.id"
  | "gps.vendor"
  | "gstin.label"
  | "history"
  | "home"
  | "i.am.driver"
  | "i.am.lsp"
  | "i.am.shipper"
  | "in.transit"
  | "india.prefix"
  | "it.will.be.enabled"
  | "loading"
  | "locate.on.map"
  | "lsp"
  | "mobile.number"
  | "modify.request"
  | "must.have.ewb"
  | "next"
  | "no.business.id"
  | "no.trips"
  | "no.upcoming.trips"
  | "on.road"
  | "open"
  | "other.profiles"
  | "otp.not.received"
  | "otp.resend.failed"
  | "otp.resent"
  | "otp.sent"
  | "otp.verified"
  | "pending"
  | "pending.literally"
  | "pick.up.date"
  | "pick.up.point"
  | "pincode"
  | "placeholder"
  | "please.wait"
  | "preference"
  | "preview"
  | "profile.setup"
  | "proof.of.delivery.tnc.received"
  | "raise.request"
  | "reached"
  | "registration.number"
  | "reject"
  | "requested"
  | "requests"
  | "required.weight"
  | "resend"
  | "rice.grain.wheat"
  | "save.company"
  | "save.truck"
  | "save.warehouse"
  | "save.warehouse.failed"
  | "saved.warehouse"
  | "saving"
  | "select.goods.type"
  | "select.location"
  | "send.request"
  | "setup.required"
  | "signature"
  | "start"
  | "start.trip"
  | "state"
  | "submit"
  | "swipe.to.start"
  | "tell.us.about"
  | "this.helps.to.personalize"
  | "trip.details"
  | "trip.id"
  | "trip.tracking.not.available"
  | "trolley"
  | "truck.details"
  | "truck.location"
  | "truck.name"
  | "truck.number"
  | "truck.save.error"
  | "truck.save.success"
  | "truck.type"
  | "trucks"
  | "try.again"
  | "upcoming"
  | "uploaded.docs"
  | "valid.upto"
  | "verifying"
  | "warehouse.details"
  | "warehouse.name"
  | "add.company"
  | "eway.dispatch.from.state"
  | "shipper"
  | "eway.to.billing.state"
  | "home.requests"
  | "eway.receipt.gstin"
  | "not.found"
  | "eway.from.billing.state"
  | "create.profile"
  | "eway.bill.details"
  | "eway.user.gst"
  | "receiver.signature"
  | "profile.start"
  | "eway.invoice.number"
  | "uploading"
  | "select.proof"
  | "delivered.on"
  | "eway.invoice.date"
  | "company.profile"
  | "received.by"
  | "add.signature"
  | "created"
  | "pod.details"
  | "active"
  | "completed"
  | "trip.success.created"
  | "accept"
  | "no.entries"
  | "generate.eway.bill"
  | "eway.vehicle.number"
  | "TON"
  | "past.trips"
  | "close.button"
  | "ewb.number"
  | "eway.delivery.pincode"
  | "company.details"
  | "intransit"
  | "receivers.name"
  | "add.truck"
  | "reject.button"
  | "starting"
  | "eway.transporter.id"
  | "step.two"
  | "details.button"
  | "upcoming.trips"
  | "delivery.receipt"
  | "eway.total.value"
  | "truck.request"
  | "eway.ship.to.state"
  | "trip.details"
  | "gstin"
  | "search.for.an.item"
  | "largeCase.pending"
  | "step.one"
  | "onroad"
  | "no.past.trips"
  | "eway.transaction"
  | "eway.transaction.subtype"
  | "eway.supplier.gstin"
  | "trip.rejected"
  | "select.transaction.subtype"
  | "personal.details"
  | "your.location"
  | "KG"
  | "full.name"
  | "profile.save"
  | "collect.pod"
  | "select.item"
  | "save.profile"
  | "eway.bill.from.pincode"
  | "delivery.address"
  | "select.truck"
  | "format.vehicle"
  | "select.gps.vendor"
  | "submit.button"
  | "ewb"
  | "trips"
  | "to"
  | "eway.hsn.code"
  | "trip.home"
  | "on.time"
  | "delay"
  | "onroadcamel"
  | "requests.camel"
  | "choose.a.reason"
  | "trip.successfully.accepted"
  | "trip.successfully.rejected"
  | "something.went wrong.please.try.again.later"
  | "something.went wrong.please.try.again"
  | "change.language";
export type GetTranslationTextType<T> = T extends "accept.terms"
  ? never
  : T extends "account"
  ? never
  : T extends "accounts"
  ? never
  : T extends "add.now"
  ? never
  : T extends "add.warehouse"
  ? never
  : T extends "address"
  ? never
  : T extends "are.you.sure"
  ? never
  : T extends "capture.pop"
  ? never
  : T extends "choose.language"
  ? never
  : T extends "choose.lsp"
  ? never
  : T extends "choose.reason"
  ? never
  : T extends "choose.truck"
  ? never
  : T extends "choose.unit"
  ? never
  : T extends "city"
  ? never
  : T extends "close"
  ? never
  : T extends "company.name"
  ? never
  : T extends "company.setup"
  ? never
  : T extends "confirm"
  ? never
  : T extends "container"
  ? never
  : T extends "continue"
  ? never
  : T extends "create.trip"
  ? never
  : T extends "current.profile"
  ? never
  : T extends "destination.point"
  ? never
  : T extends "details"
  ? never
  : T extends "do.not.have.ewb"
  ? never
  : T extends "does.not.exist"
  ? never
  : T extends "driver.details"
  ? never
  : T extends "driver.name"
  ? never
  : T extends "error"
  ? never
  : T extends "errors.address"
  ? never
  : T extends "errors.city"
  ? never
  : T extends "errors.ewb.act_from_state_code"
  ? never
  : T extends "errors.ewb.consignor_pincode"
  ? never
  : T extends "errors.ewb.delivery_pincode"
  ? never
  : T extends "errors.ewb.from_state_code"
  ? never
  : T extends "errors.ewb.hsn_code"
  ? never
  : T extends "errors.ewb.invoice_date"
  ? never
  : T extends "errors.ewb.invoice_number"
  ? never
  : T extends "errors.ewb.password"
  ? never
  : T extends "errors.ewb.recipient_gstn"
  ? never
  : T extends "errors.ewb.ship_to_state"
  ? never
  : T extends "errors.ewb.supplier_gstn"
  ? never
  : T extends "errors.ewb.to_state_code"
  ? never
  : T extends "errors.ewb.total_value"
  ? never
  : T extends "errors.ewb.transactionType"
  ? never
  : T extends "errors.ewb.transaction_sub_type"
  ? never
  : T extends "errors.ewb.transporter_id"
  ? never
  : T extends "errors.ewb.username"
  ? never
  : T extends "errors.ewb.vehicle_number"
  ? never
  : T extends "errors.gpsId"
  ? never
  : T extends "errors.gpsVendor"
  ? never
  : T extends "errors.gstin"
  ? never
  : T extends "errors.gstin.invalid"
  ? never
  : T extends "errors.location"
  ? never
  : T extends "errors.name"
  ? never
  : T extends "errors.pinCode"
  ? never
  : T extends "errors.regNumber"
  ? never
  : T extends "errors.regNumber.maxlength"
  ? never
  : T extends "errors.state"
  ? never
  : T extends "errors.truckName"
  ? never
  : T extends "errors.truckNumber"
  ? never
  : T extends "errors.truckNumberInvalid"
  ? never
  : T extends "errors.truckType"
  ? never
  : T extends "errors.warehouseName"
  ? never
  : T extends "eway.error"
  ? never
  : T extends "eway.loading"
  ? never
  : T extends "eway.password"
  ? never
  : T extends "eway.pending"
  ? never
  : T extends "eway.success"
  ? never
  : T extends "eway.username"
  ? never
  : T extends "failed.to.fetch.trip.details"
  ? never
  : T extends "from"
  ? never
  : T extends "generate.ewb"
  ? never
  : T extends "go.back"
  ? never
  : T extends "go.to.map"
  ? never
  : T extends "gps.id"
  ? never
  : T extends "gps.vendor"
  ? never
  : T extends "gstin.label"
  ? never
  : T extends "history"
  ? never
  : T extends "home"
  ? never
  : T extends "i.am.driver"
  ? never
  : T extends "i.am.lsp"
  ? never
  : T extends "i.am.shipper"
  ? never
  : T extends "in.transit"
  ? never
  : T extends "india.prefix"
  ? never
  : T extends "it.will.be.enabled"
  ? { date: string }
  : T extends "loading"
  ? never
  : T extends "locate.on.map"
  ? never
  : T extends "lsp"
  ? never
  : T extends "mobile.number"
  ? never
  : T extends "modify.request"
  ? never
  : T extends "must.have.ewb"
  ? never
  : T extends "next"
  ? never
  : T extends "no.business.id"
  ? never
  : T extends "no.trips"
  ? never
  : T extends "no.upcoming.trips"
  ? never
  : T extends "on.road"
  ? never
  : T extends "open"
  ? never
  : T extends "other.profiles"
  ? never
  : T extends "otp.not.received"
  ? never
  : T extends "otp.resend.failed"
  ? never
  : T extends "otp.resent"
  ? never
  : T extends "otp.sent"
  ? never
  : T extends "otp.verified"
  ? { phoneNumber: string }
  : T extends "pending"
  ? never
  : T extends "pending.literally"
  ? never
  : T extends "pick.up.date"
  ? never
  : T extends "pick.up.point"
  ? never
  : T extends "pincode"
  ? never
  : T extends "placeholder"
  ? { value: string }
  : T extends "please.wait"
  ? never
  : T extends "preference"
  ? never
  : T extends "preview"
  ? never
  : T extends "profile.setup"
  ? never
  : T extends "proof.of.delivery.tnc.received"
  ? never
  : T extends "raise.request"
  ? never
  : T extends "reached"
  ? never
  : T extends "registration.number"
  ? never
  : T extends "reject"
  ? never
  : T extends "requested"
  ? never
  : T extends "requests"
  ? never
  : T extends "required.weight"
  ? never
  : T extends "resend"
  ? never
  : T extends "rice.grain.wheat"
  ? never
  : T extends "save.company"
  ? never
  : T extends "save.truck"
  ? never
  : T extends "save.warehouse"
  ? never
  : T extends "save.warehouse.failed"
  ? never
  : T extends "saved.warehouse"
  ? never
  : T extends "saving"
  ? never
  : T extends "select.goods.type"
  ? never
  : T extends "select.location"
  ? never
  : T extends "send.request"
  ? never
  : T extends "setup.required"
  ? never
  : T extends "signature"
  ? never
  : T extends "start"
  ? never
  : T extends "start.trip"
  ? never
  : T extends "state"
  ? never
  : T extends "submit"
  ? never
  : T extends "swipe.to.start"
  ? never
  : T extends "tell.us.about"
  ? never
  : T extends "this.helps.to.personalize"
  ? never
  : T extends "trip.details"
  ? never
  : T extends "trip.id"
  ? never
  : T extends "trip.tracking.not.available"
  ? never
  : T extends "trolley"
  ? never
  : T extends "truck.details"
  ? never
  : T extends "truck.location"
  ? never
  : T extends "truck.name"
  ? never
  : T extends "truck.number"
  ? never
  : T extends "truck.save.error"
  ? never
  : T extends "truck.save.success"
  ? never
  : T extends "truck.type"
  ? never
  : T extends "trucks"
  ? never
  : T extends "try.again"
  ? never
  : T extends "upcoming"
  ? never
  : T extends "uploaded.docs"
  ? never
  : T extends "valid.upto"
  ? never
  : T extends "verifying"
  ? never
  : T extends "warehouse.details"
  ? never
  : T extends "warehouse.name"
  ? never
  : T extends "add.company"
  ? never
  : T extends "eway.dispatch.from.state"
  ? never
  : T extends "shipper"
  ? never
  : T extends "eway.to.billing.state"
  ? never
  : T extends "home.requests"
  ? never
  : T extends "eway.receipt.gstin"
  ? never
  : T extends "not.found"
  ? never
  : T extends "eway.from.billing.state"
  ? never
  : T extends "create.profile"
  ? never
  : T extends "eway.bill.details"
  ? never
  : T extends "eway.user.gst"
  ? never
  : T extends "receiver.signature"
  ? never
  : T extends "profile.start"
  ? never
  : T extends "eway.invoice.number"
  ? never
  : T extends "uploading"
  ? never
  : T extends "select.proof"
  ? never
  : T extends "delivered.on"
  ? never
  : T extends "eway.invoice.date"
  ? never
  : T extends "company.profile"
  ? never
  : T extends "received.by"
  ? never
  : T extends "add.signature"
  ? never
  : T extends "created"
  ? never
  : T extends "pod.details"
  ? never
  : T extends "active"
  ? never
  : T extends "completed"
  ? never
  : T extends "trip.success.created"
  ? never
  : T extends "accept"
  ? never
  : T extends "no.entries"
  ? never
  : T extends "generate.eway.bill"
  ? never
  : T extends "eway.vehicle.number"
  ? never
  : T extends "TON"
  ? never
  : T extends "past.trips"
  ? never
  : T extends "close.button"
  ? never
  : T extends "ewb.number"
  ? never
  : T extends "eway.delivery.pincode"
  ? never
  : T extends "company.details"
  ? never
  : T extends "intransit"
  ? never
  : T extends "receivers.name"
  ? never
  : T extends "add.truck"
  ? never
  : T extends "reject.button"
  ? never
  : T extends "starting"
  ? never
  : T extends "eway.transporter.id"
  ? never
  : T extends "step.two"
  ? never
  : T extends "details.button"
  ? never
  : T extends "upcoming.trips"
  ? never
  : T extends "delivery.receipt"
  ? never
  : T extends "eway.total.value"
  ? never
  : T extends "truck.request"
  ? never
  : T extends "eway.ship.to.state"
  ? never
  : T extends "trip.details"
  ? never
  : T extends "gstin"
  ? never
  : T extends "search.for.an.item"
  ? never
  : T extends "largeCase.pending"
  ? never
  : T extends "step.one"
  ? never
  : T extends "onroad"
  ? never
  : T extends "no.past.trips"
  ? never
  : T extends "eway.transaction"
  ? never
  : T extends "eway.transaction.subtype"
  ? never
  : T extends "eway.supplier.gstin"
  ? never
  : T extends "trip.rejected"
  ? never
  : T extends "select.transaction.subtype"
  ? never
  : T extends "personal.details"
  ? never
  : T extends "your.location"
  ? never
  : T extends "KG"
  ? never
  : T extends "full.name"
  ? never
  : T extends "profile.save"
  ? never
  : T extends "collect.pod"
  ? never
  : T extends "select.item"
  ? never
  : T extends "save.profile"
  ? never
  : T extends "eway.bill.from.pincode"
  ? never
  : T extends "delivery.address"
  ? never
  : T extends "select.truck"
  ? never
  : T extends "format.vehicle"
  ? never
  : T extends "select.gps.vendor"
  ? never
  : T extends "submit.button"
  ? never
  : T extends "ewb"
  ? never
  : T extends "trips"
  ? never
  : T extends "to"
  ? never
  : T extends "eway.hsn.code"
  ? never
  : T extends "trip.home"
  ? never
  : T extends "on.time"
  ? never
  : T extends "delay"
  ? never
  : T extends "onroadcamel"
  ? never
  : T extends "requests.camel"
  ? never
  : T extends "choose.a.reason"
  ? never
  : T extends "trip.successfully.accepted"
  ? never
  : T extends "trip.successfully.rejected"
  ? never
  : T extends "something.went wrong.please.try.again.later"
  ? never
  : T extends "something.went wrong.please.try.again"
  ? never
  : T extends "change.language"
  ? never
  : never;
