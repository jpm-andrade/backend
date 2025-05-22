// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs


Table organizations {
  id integer [primary key]
  name string
}

Table shops {
  id integer [primary key]
  name string
  location string
  organization_id integer [not null]
}

Table employees {
  id integer [primary key]
  name string
  shops_id integer [not null]
}

Table customers {
  id integer [primary key]
  first_name string
  last_name string
  data_of_birth timestamp
  gender string
  country string
  shop_id integer [not null]
  refered_from string
  create_by integer
  updated_by integer
  created_at timestamp
  updated_at timestamp
}

Table booking {
  id integer [primary key]
  check_in_date timestamp
  customer_id integer [not null]
}

Table activities {
  id integer [primary key]
  employee_id integer
  referal_id integer
  activity_type_id integer
  appointment_id integer
  date integer
  price integer
  discount integer
  deposit integer
}

Table activities_types{
  id integer [primary key]
  name string
}

Table activities_subtype{
  id integer [primary key]
  name string
  activity_type integer
}

Table users {
  id integer [primary key]
  username varchar
  role varchar
  created_at timestamp
  asdas string
}

Table referals {
  id integer [primary key]
  agent_id integer
}

Table agents {
  id integer [primary key]

}



Ref: "organizations"."id" < "shops"."organization_id"

Ref: "shops"."id" < "employees"."shops_id"

Ref: "shops"."id" < "customers"."shop_id"

Ref: "customers"."id" < "booking"."customer_id"

Ref: "booking"."id" < "activities"."appointment_id"

Ref: "employees"."id" < "activities"."employee_id"

Ref: "referals"."id" < "activities"."referal_id"

Ref: "activities_types"."id" < "activities_subtype"."activity_type"

Ref: "activities"."activity_type_id" < "activities_types"."id"

Ref: "referals"."agent_id" < "agents"."id"