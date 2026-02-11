# AI Task manager Schema 

## User
- id: uuid (primary key)
- name: string
- email: string (unique, indexed)
- email_verified: boolean (default: false)
- profile_image: string (url, nullable)
- role: enum ['admin', 'user', 'guest']
- password_hash: string
- is_active: boolean (default: true)
- last_login_at: timestamp (nullable)
- created_at: timestamp
- updated_at: timestamp
- deleted_at: timestamp (nullable, soft delete)

# Synced Accounts 
- id = uuid
- platform ( Notion , google Docs)
- metadata
- userId (parent)

## Inbox
- id = uuid
- userId = linked with the user 
- connections [Mail , Whatsapp..etc]
- conversations or threads []

# Converstion or thread
- id - uuid
- inboxId = linked with single inbox 
- platform [Mail , whatsapp]
- unread_count
- externalThreadId (whatspp or mail)
- senderInfo : {
    id: uuid
    name
}
- AI analyses card 
- messages []

# Analyse Card
- id
- sourceType (thread | document | task)
- sourceId
- summary
- intent
- urgencyScore (0–100)
- suggestedActions []
- confidence
- modelUsed
- createdAt

# Messages 
- id : uuid
- converstionId = linked with converstation 
- content
- platform [Mail , Whatsapp]
- attachements[] (video , image , document)
- senderId 
- createdAt 
- updatedAt 

## Projects
- id = uuid
- userId (forigen key)
- name 
- status (Active , Upcoming , onHold , Completed)
- color
- description 
- startDate 
- endDate
- progressStats (number)
- Document []
- Tasks []

## Documents
- id = uuid
- userId (parent)
- syncFrom [notion , google_docs]
- metaData
- content 
- projectId () optional 
- spaceId
- AI insights []

# Spaces
- id = uuid
- userId (forign key)
- name
- documents []


## Profile Settings 
- userId (forgein Key)
- API config [] (should be max 5 keys)

# API config 
- id = uuid
- name (for the user reference to indentify which key)
- provider (open api , openRouter , claude)
- apiKey  
- last_used_at
- usage_count
- is_active


## Task
- id: uuid (primary key)
- user_id: uuid (foreign key, indexed)
- project_id: uuid (foreign key, nullable, indexed)
- board_id: uuid (foreign key, nullable, indexed)
- thread_id: uuid (foreign key, nullable) // if generated from conversation
- name: string
- description: text (nullable)
- notes: text (nullable)
- generated_by: enum ['ai', 'user']
- status: enum ['backlog', 'in_progress', 'complete']
- priority: enum ['low', 'medium', 'high']
- start_date: date (nullable)
- due_date: date (nullable)
- completed_at: timestamp (nullable)
- created_at: timestamp
- updated_at: timestamp
- deleted_at: timestamp (nullable)

# Board
- id = uuid
- userId 
- name 
- color 
- tasks []

## Activity 
- id 
- userId 
- entityType [ task , userDetails , project]
- entityId
- action ( updated , created , deleted)
- actor ( user , ai) 


