from marshmallow import Schema, fields, validate

class ProductSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1))
    description = fields.Str()
    price = fields.Int(required=True)
    image = fields.Str()
    category = fields.Str()

class ContactSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    phone = fields.Str()
    message = fields.Str(required=True)

class OrderItemSchema(Schema):
    product_id = fields.Int(required=True)
    quantity = fields.Int(required=True, validate=validate.Range(min=1))

class OrderSchema(Schema):
    customer_name = fields.Str(required=True)
    customer_phone = fields.Str(required=True)
    customer_email = fields.Email()
    address = fields.Str(required=True)
    items = fields.List(fields.Nested(OrderItemSchema), required=True)
