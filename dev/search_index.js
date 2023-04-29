var documenterSearchIndex = {"docs":
[{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"CurrentModule = Wasabi.QueryBuilder","category":"page"},{"location":"querybuilder/#QueryBuilder","page":"Query Builder","title":"QueryBuilder","text":"","category":"section"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"You can use QueryBuilder to create and execute a query in a simple and fast way.","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"using Wasabi\nusing WasabiSQLite\n\nmutable struct User <: Wasabi.Model\n    id::Int\n    name::String\nend\n\nconfiguration = Wasabi.ConnectionConfiguration(\"test.db\")\nconn = Wasabi.connect(configuration)\n\nquery = QueryBuilder.from(User) |> QueryBuilder.select() |> QueryBuilder.limit(1)\nusers = Wasabi.df2model(User, Wasabi.execute_query(conn, user))","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"QueryBuilder supports select, join, where, limit, offset, group by and order by.","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"Select can be expressed as vector of symbols or using SelectExpr object. If no arguments are passed to select then all fields of the model are selected. You can also use alias and select function like count, sum, avg and so on.","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"QueryBuilder.from(User) |> QueryBuilder.select() # Select all fields from user model\nQueryBuilder.from(User) |> QueryBuilder.select([:id, :name]) # SELECT user_alias.id, user_alias.name FROM user user_alias\nQueryBuilder.from(User) |> QueryBuilder.select(User, :id, :total, :count) # SELECT COUNT(user_alias.id) AS total FROM user user_alias","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"Join are expressed using source, target, type (inner, outer ...), on, select. Here's an example to join User with UserProfile using an INNER JOIN and selecting the \"bio\" column from UserProfile .","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"query = QueryBuilder.from(User) |> QueryBuilder.select() |> QueryBuilder.join(User, UserProfile, :inner, (:id, :user_id), [:bio])\n\n# SELECT user.id, user.name, user_profile.bio FROM \"user\" user INNER JOIN \"user_profile\" user_profile ON user.id = user_profile.user_id","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"Where conditions are expressed as Julia Expr object where you can nest and/or conditions. The condition needs to be expressed as (Model, fieldname, function, params).","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"query = QueryBuilder.from(User) |> QueryBuilder.select() |> QueryBuilder.where(:(or, (User, name, like, \"%mattia%\"), (User, id, in, [1, 2, 3]))) |> QueryBuilder.limit(1)\nsql, params = QueryBuilder.build(query)\n\n# println(sql.value) SELECT user.id, user.name FROM \"user\" user WHERE (user.name LIKE $1 OR user.id IN $2) LIMIT 1\n# println(params) # 2-element Vector{Any}: \"%mattia%\" [1, 2, 3]","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"Modules = [Wasabi.QueryBuilder]","category":"page"},{"location":"querybuilder/","page":"Query Builder","title":"Query Builder","text":"Modules = [Wasabi.QueryBuilder]","category":"page"},{"location":"querybuilder/#Wasabi.QueryBuilder.Join","page":"Query Builder","title":"Wasabi.QueryBuilder.Join","text":"Join{T<:Wasabi.Model}\nRepresents a join for the given model.\n\n\n\n\n\n","category":"type"},{"location":"querybuilder/#Wasabi.QueryBuilder.Query","page":"Query Builder","title":"Wasabi.QueryBuilder.Query","text":"Query{T<:Wasabi.Model}\nRepresents a query for the given model.\n\n\n\n\n\n","category":"type"},{"location":"querybuilder/#Wasabi.QueryBuilder.SelectExpr","page":"Query Builder","title":"Wasabi.QueryBuilder.SelectExpr","text":"SelectExpr{T<:Wasabi.Model}\nRepresents a select expression for the given model.\n\n\n\n\n\n","category":"type"},{"location":"querybuilder/#Wasabi.QueryBuilder.build-Tuple{Wasabi.QueryBuilder.Query}","page":"Query Builder","title":"Wasabi.QueryBuilder.build","text":"build(q::Query)::Tuple{RawQuery, Vector{Any}}\nBuilds the query and returns a tuple of the query string and the parameters.\n\n\n\n\n\n","category":"method"},{"location":"querybuilder/#Wasabi.QueryBuilder.from-Union{Tuple{Type{T}}, Tuple{T}} where T<:Wasabi.Model","page":"Query Builder","title":"Wasabi.QueryBuilder.from","text":"from(source::Type{T})::Query where {T <: Model}\nCreates a new query for the given model.\n\n\n\n\n\n","category":"method"},{"location":"querybuilder/#Wasabi.QueryBuilder.groupby-Tuple{Vector{Symbol}}","page":"Query Builder","title":"Wasabi.QueryBuilder.groupby","text":"groupby(groupby::Vector{Symbol})\nSets the group by clause for the given query.\n\n\n\n\n\n","category":"method"},{"location":"querybuilder/#Wasabi.QueryBuilder.join-Union{Tuple{S}, Tuple{T}, Tuple{Type{T}, Type{S}, Symbol, Tuple{Symbol, Symbol}}, Tuple{Type{T}, Type{S}, Symbol, Tuple{Symbol, Symbol}, Vector{Symbol}}} where {T<:Wasabi.Model, S<:Wasabi.Model}","page":"Query Builder","title":"Wasabi.QueryBuilder.join","text":"join(m::Type{T}, type::Symbol, on::Tuple{Symbol, Symbol}, select_fields::Vector{Symbol} = Symbol[]) where {T <: Model}\nJoins the given model to the query.\n\n\n\n\n\n","category":"method"},{"location":"querybuilder/#Wasabi.QueryBuilder.limit-Tuple{Int64}","page":"Query Builder","title":"Wasabi.QueryBuilder.limit","text":"limit(limit::Int)\nSets the limit for the given query.\n\n\n\n\n\n","category":"method"},{"location":"querybuilder/#Wasabi.QueryBuilder.offset-Tuple{Int64}","page":"Query Builder","title":"Wasabi.QueryBuilder.offset","text":"offset(offset::Int)\nSets the offset for the given query.\n\n\n\n\n\n","category":"method"},{"location":"querybuilder/#Wasabi.QueryBuilder.orderby-Tuple{Vector{Symbol}}","page":"Query Builder","title":"Wasabi.QueryBuilder.orderby","text":"orderby(orderby::Vector{Symbol})\nSets the order by clause for the given query.\n\n\n\n\n\n","category":"method"},{"location":"querybuilder/#Wasabi.QueryBuilder.select","page":"Query Builder","title":"Wasabi.QueryBuilder.select","text":"select(select::Union{Vector{Symbol}, Nothing} = nothing)\nSets the selected columns for the given query. If no columns are specified, all columns are selected.\n\n\n\n\n\n","category":"function"},{"location":"querybuilder/#Wasabi.QueryBuilder.select-Union{Tuple{T}, Tuple{Type{T}, Symbol}, Tuple{Type{T}, Symbol, Union{Nothing, Symbol}}, Tuple{Type{T}, Symbol, Union{Nothing, Symbol}, Union{Nothing, Symbol}}} where T<:Wasabi.Model","page":"Query Builder","title":"Wasabi.QueryBuilder.select","text":"selectselect(source::Type{T}, field::Symbol, alias::Union{Symbol, Nothing} = nothing, fn::Union{Symbol, Nothing} = nothing) where {T<:Wasabi.Model}\nSets the selected columns for the given query.\n\n\n\n\n\n","category":"method"},{"location":"querybuilder/#Wasabi.QueryBuilder.select-Union{Tuple{T}, Tuple{Type{T}, Vector{Symbol}}} where T<:Wasabi.Model","page":"Query Builder","title":"Wasabi.QueryBuilder.select","text":"select(source::Type{T}, select::Vector{Symbol})\nSets the selected columns for the given query.\n\n\n\n\n\n","category":"method"},{"location":"querybuilder/#Wasabi.QueryBuilder.where-Tuple{Expr}","page":"Query Builder","title":"Wasabi.QueryBuilder.where","text":"where(expr::Expr)\nSets the where clause for the given query.\n\n\n\n\n\n","category":"method"},{"location":"api/","page":"API","title":"API","text":"CurrentModule = Wasabi","category":"page"},{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"","category":"page"},{"location":"api/","page":"API","title":"API","text":"Modules = [Wasabi]","category":"page"},{"location":"api/#Wasabi.alias-Tuple{String}","page":"API","title":"Wasabi.alias","text":"alias(m::String)\nReturns the alias of the table for the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.alias-Union{Tuple{Type{T}}, Tuple{T}} where T<:Wasabi.Model","page":"API","title":"Wasabi.alias","text":"alias(m::Type{T}) where {T <: Model}\nReturns the alias of the table for the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.all","page":"API","title":"Wasabi.all","text":"all(db::Any, m::Type{T}) where {T <: Model}\nReturns all rows of the given model.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.begin_transaction","page":"API","title":"Wasabi.begin_transaction","text":"begin_transaction(db::Any)\nBegins a transaction.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.colnames-Union{Tuple{Type{T}}, Tuple{T}} where T<:Wasabi.Model","page":"API","title":"Wasabi.colnames","text":"colnames(m::Type{T}) where {T <: Model}\nReturns the names of the columns for the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.coltype-Union{Tuple{T}, Tuple{Type{T}, Symbol}} where T<:Wasabi.Model","page":"API","title":"Wasabi.coltype","text":"coltype(m::Type{T}, col::Symbol) where {T <: Model}\nReturns the column type for the given column and model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.commit!","page":"API","title":"Wasabi.commit!","text":"commit!(db::Any)\nCommits the current transaction.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.connect","page":"API","title":"Wasabi.connect","text":"connect(config::ConnectionConfiguration)\nConnects to the database using the given configuration.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.constraints-Union{Tuple{Type{T}}, Tuple{T}} where T<:Wasabi.Model","page":"API","title":"Wasabi.constraints","text":"constraints(m::Type{T}) where {T <: Model}\nReturns the constraints for the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.create_schema","page":"API","title":"Wasabi.create_schema","text":"create_schema(db::Any, m::Type{T}) where {T <: Model}\nCreates the schema for the given model and constraints.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.delete!","page":"API","title":"Wasabi.delete!","text":"delete(db::Any, model::T) where {T <: Model}\nDeletes the given model from the database.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.delete_all!","page":"API","title":"Wasabi.delete_all!","text":"delete_all(db::Any, m::Type{T}) where {T <: Model}\nDeletes all rows from the given model.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.delete_schema","page":"API","title":"Wasabi.delete_schema","text":"delete_schema(db::Any, m::Type{T}) where {T <: Model}\nDeletes the schema for the given model.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.df2model-Union{Tuple{T}, Tuple{Type{T}, DataFrames.DataFrame}} where T<:Wasabi.Model","page":"API","title":"Wasabi.df2model","text":"df2model(m::Type{T}, df::DataFrame) where {T <: Model}\nConverts the given DataFrame to the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.disconnect","page":"API","title":"Wasabi.disconnect","text":"disconnect(db::Any)\nDisconnects from the database.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.execute_query","page":"API","title":"Wasabi.execute_query","text":"execute_query(db::Any, query::RawQuery, params::Vector{Any})\nExecutes the given query with the given parameters.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.first","page":"API","title":"Wasabi.first","text":"first(db::Any, m::Type{T}, id::Any) where {T <: Model}\nReturns the first row of the given model with the given id.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.foreign_keys-Union{Tuple{Type{T}}, Tuple{T}} where T<:Wasabi.Model","page":"API","title":"Wasabi.foreign_keys","text":"foreign_keys(m::Type{T})::Vector{ForeignKeyConstraint} where {T<:Model}\nReturns the foreign key constraints for the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.from_sql_value","page":"API","title":"Wasabi.from_sql_value","text":"from_sql_value(db::Type{Any}, v::Any)\nConverts the SQL value to the struct type value.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.insert!","page":"API","title":"Wasabi.insert!","text":"insert(db::Any, model::T) where {T <: Model}\nInserts the given model into the database.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.isnullable-Union{Tuple{T}, Tuple{Type{T}, Symbol}} where T<:Wasabi.Model","page":"API","title":"Wasabi.isnullable","text":"isnullable(m::Type{T}, field::Symbol, constraints::Vector{S}) where {T <: Model,S<:Wasabi.ModelConstraint}\nReturns true if the given column is nullable.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.mapping","page":"API","title":"Wasabi.mapping","text":"mapping(db::Type{S}, t::Type{T})::String where {S,T}\nReturns the mapping for the given database and type.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.model2tuple-Tuple{T} where T<:Wasabi.Model","page":"API","title":"Wasabi.model2tuple","text":"model2tuple(m::T) where {T <: Model}\nConverts the given model to a tuple.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.primary_key-Union{Tuple{Type{T}}, Tuple{T}} where T<:Wasabi.Model","page":"API","title":"Wasabi.primary_key","text":"primary_key(m::Type{T})::Union{PrimaryKeyConstraint, Nothing} where {T<:Model}\nReturns the primary key constraint for the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.rollback","page":"API","title":"Wasabi.rollback","text":"rollback(db::Any)\nRolls back the current transaction.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.tablename-Tuple{String}","page":"API","title":"Wasabi.tablename","text":"tablename(m::String)\nReturns the name of the table for the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.tablename-Union{Tuple{Type{T}}, Tuple{T}} where T<:Wasabi.Model","page":"API","title":"Wasabi.tablename","text":"tablename(m::Type{T}) where {T <: Model}\nReturns the name of the table for the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.to_sql_value","page":"API","title":"Wasabi.to_sql_value","text":"to_sql_value(db::Type{Any}, v::Any)\nConverts the given value to a value that can be used in a SQL query.\n\n\n\n\n\n","category":"function"},{"location":"api/#Wasabi.unique_constraints-Union{Tuple{Type{T}}, Tuple{T}} where T<:Wasabi.Model","page":"API","title":"Wasabi.unique_constraints","text":"unique_constraints(m::Type{T})::Vector{UniqueConstraint} where {T<:Model}\nReturns the unique constraints for the given model.\n\n\n\n\n\n","category":"method"},{"location":"api/#Wasabi.update!","page":"API","title":"Wasabi.update!","text":"update(db::Any, model::T) where {T <: Model}\nUpdates the given model in the database.\n\n\n\n\n\n","category":"function"},{"location":"migrations/#Migrations","page":"Migrations","title":"Migrations","text":"","category":"section"},{"location":"migrations/","page":"Migrations","title":"Migrations","text":"Migrations are an easy way to keep track of database schema updates.","category":"page"},{"location":"migrations/","page":"Migrations","title":"Migrations","text":"This will generate a folder containing the first migration which create the migration table and keep track of the current status of the database.","category":"page"},{"location":"migrations/","page":"Migrations","title":"Migrations","text":"using Wasbi\nusing WasabiMigrations\n\npath = \"migrations/\"\nWasabiMigrations.generate(path)","category":"page"},{"location":"migrations/","page":"Migrations","title":"Migrations","text":"Next you can update (upgrade/downgrade) the database to the required version doing","category":"page"},{"location":"migrations/","page":"Migrations","title":"Migrations","text":"using Wasbi\nusing WasabiMigrations\nusing WasabiSQLite\n\nversion = \"xxx\" # using WasabiMigrations.get_last_version(path) gives you the latest available migration\nWasabiMigrations.execute(db, path, version)","category":"page"},{"location":"customtype/#Create-a-Custom-Type","page":"Create Custom Type","title":"Create a Custom Type","text":"","category":"section"},{"location":"customtype/","page":"Create Custom Type","title":"Create Custom Type","text":"You can implement a new custom type just implementing some functions.","category":"page"},{"location":"customtype/","page":"Create Custom Type","title":"Create Custom Type","text":"Wasabi.to_sql_value(value::CustomType) is used to convert the custom type to the database type","category":"page"},{"location":"customtype/","page":"Create Custom Type","title":"Create Custom Type","text":"Wasabi.from_sql_value(t::Type{CustomType}, value::Any) is used to convert the value from the database to your custom type","category":"page"},{"location":"customtype/","page":"Create Custom Type","title":"Create Custom Type","text":"Wasabi.mapping(db::Type{SQLite.DB}, t::Type{CustomType}) is used to define the database type","category":"page"},{"location":"customtype/","page":"Create Custom Type","title":"Create Custom Type","text":"Suppose you want to create a JSON type called CustomType that is converted as TEXT on the database.","category":"page"},{"location":"customtype/","page":"Create Custom Type","title":"Create Custom Type","text":"using SQLite\n\nstruct CustomType\n    value::Dict\nend\n\nWasabi.mapping(db::Type{SQLite.DB}, t::Type{CustomType}) = \"TEXT\"\nWasabi.to_sql_value(value::CustomType) = JSON.json(value.value)\nWasabi.from_sql_value(t::Type{CustomType}, value::Any) = CustomType(JSON.parse(value))\n\nstruct TestModel <: Wasabi.Model\n    id::Int\n    custom::CustomType\nend\n\nmodel = TestModel(1, CustomType(Dict(\"key\" => \"value\")))\nWasabi.insert!(conn, model)\n\nmodel = Wasabi.first(conn, TestModel, 1) # model.custom.value[\"key\"] == \"value\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Wasabi","category":"page"},{"location":"#Wasabi","page":"Home","title":"Wasabi","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Wasabi is a simple ORM for Julia. It currently supports PostgreSQL and SQLite. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Wasabi\nusing WasabiSQLite\n\n# connect to database\nconfiguration = WasabiSQLite.ConnectionConfiguration(\"test.db\")\nconn = Wasabi.connect(configuration)\n\n# declare models\nmutable struct User <: Wasabi.Model\n    id::Union{Nothing, AutoIncrement}\n    name::String\nend\n\nWasabi.primary_key(m::Type{User}) = Wasabi.PrimaryKeyConstraint(Symbol[:id])\n\nstruct UserProfile <: Wasabi.Model\n    id::Int\n    user_id::Int\n    bio::Union{String,Nothing}\nend\n\nWasabi.primary_key(m::Type{UserProfile}) = Wasabi.PrimaryKeyConstraint(Symbol[:id])\nWasabi.foreign_keys(m::Type{UserProfile}) = [Wasabi.ForeignKeyConstraint(Symbol[:user_id], :user, Symbol[:id])]\n\nWasabi.create_schema(conn, User)\nWasabi.create_schema(conn, UserProfile)\n\nuser = User(\"John Doe\")\nWasabi.insert!(conn, user)\n\n# If struct is mutable, autoincrement id is automatically set to the model\n# println(user.id) -> 1\n\nu = Wasabi.first(conn, User, keys[!, :id])\n\nWasabi.begin_transaction(conn)\ntry\n    Wasabi.insert!(conn, user)\n    Wasabi.commit!(conn)\ncatch e\n    Wasabi.rollback(conn)\n    rethrow(e)\nend\n\nres = Wasabi.execute_query(conn, rq\"SELECT * FROM user where name = ?\", Any[\"John Doe\"])\nusers = Wasabi.df2model(User, res)\n\nu.name = \"Jane Doe\"\nWasabi.update!(conn, user)\n\nWasabi.delete!(conn, user)\n\nqb = QueryBuilder.select(User) |> QueryBuilder.where(:(and, (User, name, like, \"%John%\"))) |> QueryBuilder.limit(1)\nusers = Wasabi.execute_query(conn, qb)\n\nWasabi.disconnect(conn)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Documentation for Wasabi.","category":"page"}]
}
