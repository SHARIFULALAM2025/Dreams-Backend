const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
//
// route use
const propertyRoutes =
    require(
        './routes/propertyRoutes'
    )
app.use(
    '/api/property',
    propertyRoutes
)

// ==========================================
// ১. ইউজার রাউটস (আপনার আগের কোড)
// ==========================================
app.post('/all-user', async (req, res) => {
    console.log(req.body);

    const { name, email, photo } = req.body;
    try {
        await db('users').insert({ name, email, photo });
        res.status(201).json({ message: "User saved successfully!" });
    } catch (error) {
        console.error("Database Error:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(200).json({ message: "User already exists" });
        }
        res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await db('users').select('*');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// ২. মাল্টি-ল্যাংগুয়েজ ট্রান্সলেশন রাউটস (নতুন যোগ করা)
// ==========================================

// ==========================================
// ২. মাল্টি-ল্যাংগুয়েজ ট্রান্সলেশন রাউটস (ফিক্সড)
// ==========================================

app.post('/api/components', async (req, res) => {
    const { component_name, content_data } = req.body;
    try {

        const finalData = typeof content_data === 'object' ? JSON.stringify(content_data) : content_data;

        await db('site_components').insert({
            component_name,
            content_data: finalData
        });
        res.status(201).json({ message: "Component data saved successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/components/:name', async (req, res) => {
    try {
        const data = await db('site_components').where({ component_name: req.params.name }).first();

        if (data) {
            let parsedData;


            if (typeof data.content_data === 'string') {
                parsedData = JSON.parse(data.content_data);
            } else {
                parsedData = data.content_data;
            }

            res.json(parsedData);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});
//agent
app.post('/agent/api', async (req, res) => {
    const { component_name, content_data } = req.body;
    try {

        const finalData = typeof content_data === 'object' ? JSON.stringify(content_data) : content_data;

        await db('agent_components').insert({
            component_name,
            content_data: finalData
        });
        res.status(201).json({ message: "Component data saved successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/components/agent/:name', async (req, res) => {
    try {
        const data = await db('agent_components').where({ component_name: req.params.name }).first();

        if (data) {
            let parsedData;
            if (typeof data.content_data === 'string') {
                parsedData = JSON.parse(data.content_data);
            } else {
                parsedData = data.content_data;
            }

            res.json(parsedData);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/single/agent/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db('agent_components')
            .where({ component_name: 'agent_profile_page_data' })
            .first();

        if (data) {
            let parsedContentData;


            if (typeof data.content_data === 'string') {
                parsedContentData = JSON.parse(data.content_data);
            } else {
                parsedContentData = data.content_data;
            }


            if (Array.isArray(parsedContentData)) {
                const singleAgent = parsedContentData.find(agent => String(agent.id) === String(id));

                if (singleAgent) {

                    return res.json(singleAgent);
                } else {
                    return res.status(404).json({ message: `Agent with ID ${id} not found` });
                }
            } else {
                return res.status(500).json({ message: "content_data is not an array" });
            }

        } else {
            res.status(404).json({ message: "Component data not found in database" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});

//
app.post('/blog/agent/api', async (req, res) => {
    const { component_name, content_data } = req.body;
    try {

        const finalData = typeof content_data === 'object' ? JSON.stringify(content_data) : content_data;

        await db('blog_components').insert({
            component_name,
            content_data: finalData
        });
        res.status(201).json({ message: "Component data saved successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/al-blog/:name', async (req, res) => {
    try {
        const data = await db('blog_components').where({ component_name: req.params.name }).first();

        if (data) {
            let parsedData;
            if (typeof data.content_data === 'string') {
                parsedData = JSON.parse(data.content_data);
            } else {
                parsedData = data.content_data;
            }

            res.json(parsedData);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/blog/single/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db('blog_components')
            .where({ component_name: 'blog_page_data' })
            .first();

        if (data) {
            let parsedContentData;


            if (typeof data.content_data === 'string') {
                parsedContentData = JSON.parse(data.content_data);
            } else {
                parsedContentData = data.content_data;
            }


            if (Array.isArray(parsedContentData)) {
                const singleAgent = parsedContentData.find(agent => String(agent.id) === String(id));

                if (singleAgent) {

                    return res.json(singleAgent);
                } else {
                    return res.status(404).json({ message: `Agent with ID ${id} not found` });
                }
            } else {
                return res.status(500).json({ message: "content_data is not an array" });
            }

        } else {
            res.status(404).json({ message: "Component data not found in database" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});
//
app.post('/faq/api', async (req, res) => {
    const { component_name, content_data } = req.body;
    try {

        const finalData = typeof content_data === 'object' ? JSON.stringify(content_data) : content_data;

        await db('Faq_page_data').insert({
            component_name,
            content_data: finalData
        });
        res.status(201).json({ message: "Component data saved successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/faq/components/:name', async (req, res) => {
    try {
        const data = await db('Faq_page_data').where({ component_name: req.params.name }).first();

        if (data) {
            let parsedData;


            if (typeof data.content_data === 'string') {
                parsedData = JSON.parse(data.content_data);
            } else {
                parsedData = data.content_data;
            }

            res.json(parsedData);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});

//
app.post('/testimonial/api', async (req, res) => {
    const { component_name, content_data } = req.body;
    try {

        const finalData = typeof content_data === 'object' ? JSON.stringify(content_data) : content_data;

        await db('testimonial_page_data').insert({
            component_name,
            content_data: finalData
        });
        res.status(201).json({ message: "Component data saved successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/testimonial/components/:name', async (req, res) => {
    try {
        const data = await db('testimonial_page_data').where({ component_name: req.params.name }).first();

        if (data) {
            let parsedData;


            if (typeof data.content_data === 'string') {
                parsedData = JSON.parse(data.content_data);
            } else {
                parsedData = data.content_data;
            }

            res.json(parsedData);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.post('/homeAbout/api', async (req, res) => {
    const { component_name, content_data } = req.body;
    try {

        const finalData = typeof content_data === 'object' ? JSON.stringify(content_data) : content_data;

        await db('homeAbout_page_data').insert({
            component_name,
            content_data: finalData
        });
        res.status(201).json({ message: "Component data saved successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/aboutHome/:name', async (req, res) => {
    try {
        const data = await db('homeAbout_page_data').where({ component_name: req.params.name }).first();

        if (data) {
            let parsedData;


            if (typeof data.content_data === 'string') {
                parsedData = JSON.parse(data.content_data);
            } else {
                parsedData = data.content_data;
            }

            res.json(parsedData);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/benefit/api', async (req, res) => {
    const { component_name, content_data } = req.body;
    try {

        const finalData = typeof content_data === 'object' ? JSON.stringify(content_data) : content_data;

        await db('benefit_page_data').insert({
            component_name,
            content_data: finalData
        });
        res.status(201).json({ message: "Component data saved successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/benefit/data/:name', async (req, res) => {
    try {
        const data = await db('benefit_page_data').where({ component_name: req.params.name }).first();

        if (data) {
            let parsedData;


            if (typeof data.content_data === 'string') {
                parsedData = JSON.parse(data.content_data);
            } else {
                parsedData = data.content_data;
            }

            res.json(parsedData);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});

//
app.post('/agency/api', async (req, res) => {
    const { component_name, content_data } = req.body;
    try {

        const finalData = typeof content_data === 'object' ? JSON.stringify(content_data) : content_data;

        await db('agency_page_data').insert({
            component_name,
            content_data: finalData
        });
        res.status(201).json({ message: "Component data saved successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/allAgency/data/:name', async (req, res) => {
    try {
        const data = await db('agency_page_data').where({ component_name: req.params.name }).first();

        if (data) {
            let parsedData;


            if (typeof data.content_data === 'string') {
                parsedData = JSON.parse(data.content_data);
            } else {
                parsedData = data.content_data;
            }

            res.json(parsedData);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/singleAgency/single/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db('agency_page_data')
            .where({ component_name: 'agency_page_data' })
            .first();

        if (data) {
            let parsedContentData;


            if (typeof data.content_data === 'string') {
                parsedContentData = JSON.parse(data.content_data);
            } else {
                parsedContentData = data.content_data;
            }


            if (Array.isArray(parsedContentData)) {
                const singleAgent = parsedContentData.find(agent => String(agent.id) === String(id));

                if (singleAgent) {

                    return res.json(singleAgent);
                } else {
                    return res.status(404).json({ message: `Agent with ID ${id} not found` });
                }
            } else {
                return res.status(500).json({ message: "content_data is not an array" });
            }

        } else {
            res.status(404).json({ message: "Component data not found in database" });
        }
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Dreams Estate Backend Running Successfully");
});

db.raw("SELECT 1").then(() => {
    console.log("✅ MySQL Database Connected with Aiven!");
}).catch((err) => {
    console.log("❌ Database Connection Failed!");
    console.error(err);
});