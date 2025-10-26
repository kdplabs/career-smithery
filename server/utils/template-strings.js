// Auto-generated template file - DO NOT EDIT MANUALLY

export const classic_resume_hbs = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="bg-white p-6 max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-6 border-b-2 border-gray-300 pb-4">
            <h1 class="text-3xl font-bold mb-2 text-gray-900">{{ resumeData.personalInfo.fullName }}</h1>
            <div class="text-sm text-gray-700 space-y-1">
                <div class="flex justify-center items-center space-x-4 flex-wrap">
                    <span>{{ resumeData.personalInfo.email }}</span>
                    <span>•</span>
                    <span>{{ resumeData.personalInfo.phone }}</span>
                    {{#if resumeData.personalInfo.location}}
                        <span>•</span>
                        <span>{{ resumeData.personalInfo.location }}</span>
                    {{/if}}
                </div>
                {{#if resumeData.personalInfo.linkedin}}
                <div class="flex justify-center items-center space-x-4 flex-wrap">
                    <span>{{ resumeData.personalInfo.linkedin }}</span>
                    {{#if resumeData.personalInfo.website}}
                        <span>•</span>
                        <span>{{ resumeData.personalInfo.website }}</span>
                    {{/if}}
                </div>
                {{else}}
                    {{#if resumeData.personalInfo.website}}
                    <div class="flex justify-center items-center space-x-4 flex-wrap">
                        <span>{{ resumeData.personalInfo.website }}</span>
                    </div>
                    {{/if}}
                {{/if}}
            </div>
        </div>

        <!-- Professional Summary -->
        <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1">PROFESSIONAL SUMMARY</h2>
            <p class="text-sm leading-relaxed text-gray-800 pt-2">{{ resumeData.professionalSummary }}</p>
        </div>

        <!-- Work Experience -->
        <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3">WORK EXPERIENCE</h2>
            {{#each resumeData.workExperience}}
            <div class="mb-4">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="font-bold text-sm text-gray-900">{{ this.jobTitle }}</h3>
                        <p class="text-sm text-gray-800">{{ this.company }}{{#if this.location}}, {{ this.location }}{{/if}}</p>
                    </div>
                    <div class="text-sm text-gray-700 text-right">
                        {{ this.startDate }} - {{#if this.endDate}}{{ this.endDate }}{{else}}Present{{/if}}
                    </div>
                </div>
                <ul class="space-y-1">
                    {{#each this.achievements}}
                    <li class="text-sm text-gray-800 flex items-start">
                        <span class="text-gray-800 mr-2 mt-0.5 flex-shrink-0">•</span>
                        <span class="leading-relaxed">{{ this }}</span>
                    </li>
                    {{/each}}
                </ul>
            </div>
            {{/each}}
        </div>

        <!-- Education -->
        <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3">EDUCATION</h2>
            {{#each resumeData.education}}
            <div class="mb-3">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-sm text-gray-900">
                            {{ this.degree }}{{#if this.field}}, {{ this.field }}{{/if}}
                        </h3>
                        <p class="text-sm text-gray-800">{{ this.institution }}</p>
                        {{#if this.gpa}}
                        <p class="text-sm text-gray-700">
                            <span>GPA: {{ this.gpa }}</span>
                            {{#if this.honors}}
                                <span> • </span>
                                <span>{{ this.honors }}</span>
                            {{/if}}
                        </p>
                        {{else}}
                            {{#if this.honors}}
                            <p class="text-sm text-gray-700">
                                <span>{{ this.honors }}</span>
                            </p>
                            {{/if}}
                        {{/if}}
                    </div>
                    {{#if this.graduationYear}}
                    <div class="text-sm text-gray-700">
                        {{ this.graduationYear }}
                    </div>
                    {{/if}}
                </div>
            </div>
            {{/each}}
        </div>

        <!-- Skills -->
        <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3">SKILLS</h2>
            <div class="grid grid-cols-1 gap-2">
                {{#if resumeData.skills.technical}}
                <div class="mb-2">
                    <span class="font-semibold text-sm text-gray-900">Technical: </span>
                    <span class="text-sm text-gray-800">{{#each resumeData.skills.technical}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}</span>
                </div>
                {{/if}}
                {{#if resumeData.skills.tools}}
                <div class="mb-2">
                    <span class="font-semibold text-sm text-gray-900">Tools & Platforms: </span>
                    <span class="text-sm text-gray-800">{{#each resumeData.skills.tools}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}</span>
                </div>
                {{/if}}
                {{#if resumeData.skills.soft}}
                <div class="mb-2">
                    <span class="font-semibold text-sm text-gray-900">Core Competencies: </span>
                    <span class="text-sm text-gray-800">{{#each resumeData.skills.soft}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}</span>
                </div>
                {{/if}}
                {{#if resumeData.skills.languages}}
                <div class="mb-2">
                    <span class="font-semibold text-sm text-gray-900">Languages: </span>
                    <span class="text-sm text-gray-800">{{#each resumeData.skills.languages}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}</span>
                </div>
                {{/if}}
            </div>
        </div>

        <!-- Certifications -->
        {{#if resumeData.certifications}}
        <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3">CERTIFICATIONS</h2>
            {{#each resumeData.certifications}}
            <div class="mb-2">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-sm text-gray-900">{{ this.name }}</h3>
                        <p class="text-sm text-gray-800">{{ this.issuer }}</p>
                    </div>
                    <div class="text-sm text-gray-700 text-right">
                        {{#if this.date}}<div>{{ this.date }}</div>{{/if}}
                        {{#if this.expirationDate}}<div class="text-xs">Expires: {{ this.expirationDate }}</div>{{/if}}
                    </div>
                </div>
            </div>
            {{/each}}
        </div>
        {{/if}}

        <!-- Projects -->
        {{#if resumeData.projects}}
        <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3">PROJECTS</h2>
            {{#each resumeData.projects}}
            <div class="mb-3">
                <h3 class="font-bold text-sm text-gray-900">{{ this.name }}</h3>
                <p class="text-sm text-gray-800 mb-1">{{ this.description }}</p>
                {{#if this.technologies}}
                <div class="text-sm text-gray-700 mb-1">
                    <span class="font-semibold">Technologies: </span>{{#each this.technologies}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}
                </div>
                {{/if}}
                {{#if this.link}}
                <div class="text-sm text-gray-700">
                    <span class="font-semibold">Link: </span>{{ this.link }}
                </div>
                {{/if}}
            </div>
            {{/each}}
        </div>
        {{/if}}
    </div>
</body>
</html>
`;

export const modern_resume_hbs = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', 'Segoe UI', sans-serif;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="bg-white max-w-4xl mx-auto shadow-lg overflow-hidden">
        <!-- Header with Color Background -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div class="mb-4 md:mb-0">
                    <h1 class="text-4xl font-bold mb-2">{{ resumeData.personalInfo.fullName }}</h1>
                    <div class="flex flex-wrap gap-4 text-blue-100">
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>
                            <span>{{ resumeData.personalInfo.email }}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                            </svg>
                            <span>{{ resumeData.personalInfo.phone }}</span>
                        </div>
                        {{#if resumeData.personalInfo.location}}
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                            </svg>
                            <span>{{ resumeData.personalInfo.location }}</span>
                        </div>
                        {{/if}}
                    </div>
                    <div class="flex flex-wrap gap-4 text-blue-100 mt-2">
                        {{#if resumeData.personalInfo.linkedin}}
                        <div class="flex items-center space-x-2">
                             <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"/>
                            </svg>
                            <span class="truncate">{{ resumeData.personalInfo.linkedin }}</span>
                        </div>
                        {{/if}}
                        {{#if resumeData.personalInfo.website}}
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                            <span class="truncate">{{ resumeData.personalInfo.website }}</span>
                        </div>
                        {{/if}}
                    </div>
                </div>
            </div>
        </div>

        <div class="p-6">
            <!-- Professional Summary -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center mb-4">
                    <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                    PROFESSIONAL SUMMARY
                </h2>
                <p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
                    {{ resumeData.professionalSummary }}
                </p>
            </div>

            <!-- Work Experience -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center mb-6">
                    <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                    WORK EXPERIENCE
                </h2>
                <div class="space-y-6">
                    {{#each resumeData.workExperience}}
                    <div class="relative pl-8 pb-6">
                        <div class="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div class="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200"></div>
                        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-1">{{ this.jobTitle }}</h3>
                                    <p class="text-lg text-blue-600 font-medium">{{ this.company }}</p>
                                    {{#if this.location}}<p class="text-gray-600">{{ this.location }}</p>{{/if}}
                                </div>
                                <div class="text-right">
                                    <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {{ this.startDate }} - {{#if this.endDate}}{{ this.endDate }}{{else}}Present{{/if}}
                                    </span>
                                </div>
                            </div>
                            <ul class="space-y-2">
                                {{#each this.achievements}}
                                <li class="flex items-start">
                                    <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span class="text-gray-700">{{ this }}</span>
                                </li>
                                {{/each}}
                            </ul>
                        </div>
                    </div>
                    {{/each}}
                </div>
            </div>

            <!-- Education -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center mb-6">
                    <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                    EDUCATION
                </h2>
                <div class="grid grid-cols-2 gap-6">
                    {{#each resumeData.education}}
                    <div class="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600">
                        <h3 class="text-lg font-bold text-gray-900 mb-2">
                            {{ this.degree }}{{#if this.field}}, {{ this.field }}{{/if}}
                        </h3>
                        <p class="text-blue-600 font-medium mb-1">{{ this.institution }}</p>
                        <p class="text-gray-600 text-sm mb-2">{{ this.graduationYear }}</p>
                        {{#if this.gpa}}
                        <div class="text-sm text-gray-700">
                            <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">GPA: {{ this.gpa }}</span>
                             {{#if this.honors}}<span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">{{ this.honors }}</span>{{/if}}
                        </div>
                        {{else}}
                             {{#if this.honors}}<span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">{{ this.honors }}</span>{{/if}}
                        {{/if}}
                    </div>
                    {{/each}}
                </div>
            </div>

            <!-- Skills -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center mb-6">
                    <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                    SKILLS
                </h2>
                <div class="grid grid-cols-2 gap-6">
                    {{#if resumeData.skills.technical}}
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                             <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                            </svg>
                            Technical Skills
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            {{#each resumeData.skills.technical}}
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{{ this }}</span>
                            {{/each}}
                        </div>
                    </div>
                    {{/if}}
                    {{#if resumeData.skills.tools}}
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                             <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                            </svg>
                            Tools & Platforms
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            {{#each resumeData.skills.tools}}
                            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">{{ this }}</span>
                            {{/each}}
                        </div>
                    </div>
                    {{/if}}
                    {{#if resumeData.skills.soft}}
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <svg class="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                            </svg>
                            Core Competencies
                        </h3>
                        <div class="flex flex-wrap gap-2">
                             {{#each resumeData.skills.soft}}
                            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">{{ this }}</span>
                            {{/each}}
                        </div>
                    </div>
                    {{/if}}
                    {{#if resumeData.skills.languages}}
                     <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                             <svg class="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3V3a1 1 0 112 0v1h3V3a1 1 0 112 0v1h1a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zM4 6h12v8H4V6z" clip-rule="evenodd"/>
                            </svg>
                            Languages
                        </h3>
                        <div class="flex flex-wrap gap-2">
                             {{#each resumeData.skills.languages}}
                            <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">{{ this }}</span>
                            {{/each}}
                        </div>
                    </div>
                    {{/if}}
                </div>
            </div>

            <!-- Certifications -->
            {{#if resumeData.certifications}}
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center mb-6">
                    <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                    CERTIFICATIONS
                </h2>
                <div class="grid grid-cols-2 gap-6">
                    {{#each resumeData.certifications}}
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <h3 class="text-lg font-bold text-gray-900 mb-1">{{ this.name }}</h3>
                                <p class="text-blue-600 font-medium">{{ this.issuer }}</p>
                            </div>
                            <div class="text-right">
                                {{#if this.date}}<div class="text-sm text-gray-600">{{ this.date }}</div>{{/if}}
                                {{#if this.expirationDate}}<div class="text-xs text-gray-500">Expires: {{ this.expirationDate }}</div>{{/if}}
                            </div>
                        </div>
                    </div>
                    {{/each}}
                </div>
            </div>
            {{/if}}

            <!-- Projects -->
             {{#if resumeData.projects}}
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center mb-6">
                    <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                    PROJECTS
                </h2>
                <div class="grid grid-cols-2 gap-6">
                    {{#each resumeData.projects}}
                    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ this.name }}</h3>
                        <p class="text-gray-700 mb-4">{{ this.description }}</p>
                        {{#if this.technologies}}
                        <div class="mb-4">
                            <div class="flex flex-wrap gap-2">
                                {{#each this.technologies}}
                                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{{ this }}</span>
                                {{/each}}
                            </div>
                        </div>
                        {{/if}}
                        {{#if this.link}}
                        <div class="text-sm">
                            <a href="{{ this.link }}" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                                View Project →
                            </a>
                        </div>
                        {{/if}}
                    </div>
                    {{/each}}
                </div>
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>
`;

export const minimal_resume_hbs = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="bg-white p-8 max-w-4xl mx-auto">
        <!-- Header -->
        <div class="border-b border-gray-200 pb-8 mb-10">
            <h1 class="text-5xl font-light text-gray-900 mb-4 tracking-wide">{{ resumeData.personalInfo.fullName }}</h1>
            <div class="flex flex-wrap gap-8 text-gray-600">
                <span>{{ resumeData.personalInfo.email }}</span>
                <span>{{ resumeData.personalInfo.phone }}</span>
                {{#if resumeData.personalInfo.location}}<span>{{ resumeData.personalInfo.location }}</span>{{/if}}
                {{#if resumeData.personalInfo.linkedin}}<span>{{ resumeData.personalInfo.linkedin }}</span>{{/if}}
                {{#if resumeData.personalInfo.website}}<span>{{ resumeData.personalInfo.website }}</span>{{/if}}
            </div>
        </div>

        <!-- Professional Summary -->
        <div class="mb-12">
            <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Professional Summary</h2>
            <p class="text-gray-700 leading-relaxed max-w-4xl">{{ resumeData.professionalSummary }}</p>
        </div>

        <!-- Work Experience -->
        <div class="mb-12">
            <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-8">Experience</h2>
            <div class="space-y-10">
                {{#each resumeData.workExperience}}
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900">{{ this.jobTitle }}</h3>
                            <p class="text-gray-600">{{ this.company }}{{#if this.location}}, {{ this.location }}{{/if}}</p>
                        </div>
                        <span class="text-sm text-gray-500 font-light">
                            {{ this.startDate }} — {{#if this.endDate}}{{ this.endDate }}{{else}}Present{{/if}}
                        </span>
                    </div>
                    <ul class="space-y-3 text-gray-700">
                        {{#each this.achievements}}
                        <li class="flex items-start">
                            <span class="text-gray-400 mr-3 mt-2 flex-shrink-0">—</span>
                            <span>{{ this }}</span>
                        </li>
                        {{/each}}
                    </ul>
                </div>
                {{/each}}
            </div>
        </div>

        <!-- Two Column Layout for Education and Skills -->
        <div class="grid grid-cols-2 gap-12">
            <!-- Education -->
            <div>
                <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-6">Education</h2>
                <div class="space-y-6">
                    {{#each resumeData.education}}
                    <div>
                        <h3 class="text-base font-medium text-gray-900">
                            {{ this.degree }}{{#if this.field}}, {{ this.field }}{{/if}}
                        </h3>
                        <p class="text-gray-600">{{ this.institution }}</p>
                        <p class="text-sm text-gray-500">{{ this.graduationYear }}</p>
                        {{#if this.gpa}}
                        <div class="text-sm text-gray-600 mt-1">
                            <span>GPA: {{ this.gpa }}</span>
                            {{#if this.honors}}
                                <span> • </span>
                                <span>{{ this.honors }}</span>
                            {{/if}}
                        </div>
                         {{else}}
                            {{#if this.honors}}
                                 <div class="text-sm text-gray-600 mt-1">
                                    <span>{{ this.honors }}</span>
                                </div>
                            {{/if}}
                        {{/if}}
                    </div>
                    {{/each}}
                </div>
            </div>

            <!-- Skills -->
            <div>
                <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-6">Skills</h2>
                <div class="space-y-4">
                    {{#if resumeData.skills.technical}}
                    <div>
                        <h3 class="text-sm font-medium text-gray-900 mb-2">Technical</h3>
                        <p class="text-gray-700">{{#each resumeData.skills.technical}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}</p>
                    </div>
                    {{/if}}
                    {{#if resumeData.skills.tools}}
                    <div>
                        <h3 class="text-sm font-medium text-gray-900 mb-2">Tools & Platforms</h3>
                        <p class="text-gray-700">{{#each resumeData.skills.tools}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}</p>
                    </div>
                    {{/if}}
                    {{#if resumeData.skills.soft}}
                    <div>
                        <h3 class="text-sm font-medium text-gray-900 mb-2">Core Competencies</h3>
                        <p class="text-gray-700">{{#each resumeData.skills.soft}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}</p>
                    </div>
                    {{/if}}
                    {{#if resumeData.skills.languages}}
                    <div>
                        <h3 class="text-sm font-medium text-gray-900 mb-2">Languages</h3>
                        <p class="text-gray-700">{{#each resumeData.skills.languages}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}</p>
                    </div>
                    {{/if}}
                </div>
            </div>
        </div>

        <!-- Certifications -->
        {{#if resumeData.certifications}}
        <div class="mt-12">
            <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-6">Certifications</h2>
            <div class="space-y-4">
                {{#each resumeData.certifications}}
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-base font-medium text-gray-900">{{ this.name }}</h3>
                        <p class="text-gray-600">{{ this.issuer }}</p>
                    </div>
                    <div class="text-right text-sm text-gray-500">
                        {{#if this.date}}<div>{{ this.date }}</div>{{/if}}
                        {{#if this.expirationDate}}<div class="text-xs">Expires: {{ this.expirationDate }}</div>{{/if}}
                    </div>
                </div>
                {{/each}}
            </div>
        </div>
        {{/if}}

        <!-- Projects -->
        {{#if resumeData.projects}}
        <div class="mt-12">
            <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-6">Projects</h2>
            <div class="space-y-6">
                {{#each resumeData.projects}}
                <div>
                    <h3 class="text-base font-medium text-gray-900 mb-2">{{ this.name }}</h3>
                    <p class="text-gray-700 mb-2">{{ this.description }}</p>
                    {{#if this.technologies}}
                    <div class="text-sm text-gray-600 mb-1">
                        <span class="font-medium">Technologies:</span> {{#each this.technologies}}{{#unless @first}}, {{/unless}}{{this}}{{/each}}
                    </div>
                    {{/if}}
                    {{#if this.link}}
                    <div class="text-sm text-gray-600">
                        <span class="font-medium">Link:</span> {{ this.link }}
                    </div>
                    {{/if}}
                </div>
                {{/each}}
            </div>
        </div>
        {{/if}}
    </div>
</body>
</html>
`;

export const classic_cover_letter_hbs = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cover Letter</title>
    <style>
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        :root {
        font-family: 'Quicksand', sans-serif;
        }

        body {
        font-family: 'Quicksand', sans-serif;
        }
    </style>
     <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="cover-letter-content-wrapper">
    <div class="cover-letter-classic bg-white min-h-screen">
      <!-- Header Section -->
      <div class="bg-gray-100 text-gray-900 p-8 border-b border-gray-200">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold mb-2">{{ resumeData.personalInfo.fullName }}</h1>
              <p class="text-gray-600 text-lg">{{ resumeData.personalInfo.title }}</p>
              <div class="flex items-center space-x-4 mt-3 text-gray-600">
                {{#if resumeData.personalInfo.email}}
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {{ resumeData.personalInfo.email }}
                </div>
                {{/if}}
                {{#if resumeData.personalInfo.phone}}
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  {{ resumeData.personalInfo.phone }}
                </div>
                {{/if}}
                {{#if resumeData.personalInfo.location}}
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ resumeData.personalInfo.location }}
                </div>
                {{/if}}
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold">{{currentDate}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto p-8">
        <div class="grid grid-cols-3 gap-8 mb-8">
          <div class="col-span-2">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div class="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                Cover Letter
              </h2>
              <div class="prose prose-lg max-w-none">
                <div class="whitespace-pre-line text-gray-800 leading-relaxed">{{ coverLetterData.coverLetterText }}</div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4 text-center">Role Alignment</h3>
              <div class="flex justify-center mb-4">
                <div class="relative inline-flex items-center justify-center w-20 h-20">
                  <svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      stroke-width="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-dasharray="{{coverLetterData.alignmentScore}}, 100"
                    />
                  </svg>
                  <span class="absolute text-lg font-bold text-gray-900">{{ coverLetterData.alignmentScore }}%</span>
                </div>
              </div>
              <p class="text-sm text-gray-600 text-center">{{ getAlignmentDescription coverLetterData.alignmentScore }}</p>
            </div>

            {{#if coverLetterData.companyHighlights}}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <div class="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-3"></div>
                Experience Highlights
              </h3>
              
              <div class="space-y-4">
                {{#each coverLetterData.companyHighlights}}
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 class="font-bold text-lg text-gray-900 mb-3 text-center">{{this.companyName}}</h4>
                  <p class="text-sm text-gray-700">{{this.keyAchievements.[0]}}</p>
                </div>
                {{/each}}
              </div>
            </div>
            {{/if}}
          </div>
        </div>

        {{#if coverLetterData.alignedSkills}}
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div class="w-2 h-6 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-full mr-3"></div>
            Key Skills Match
          </h2>
          
          <div class="grid grid-cols-3 gap-6">
            {{#each coverLetterData.alignedSkills}}
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center min-h-[80px]">
              <span class="font-semibold text-gray-900 text-center">{{this.skillName}}</span>
            </div>
            {{/each}}
          </div>
        </div>
        {{/if}}
      </div>
    </div>
  </div>
</body>
</html>
`;

export const modern_cover_letter_hbs = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cover Letter</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="cover-letter-content-wrapper">
        <div class="cover-letter-modern bg-white min-h-screen">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                <div class="max-w-4xl mx-auto">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-3xl font-bold mb-2">{{ resumeData.personalInfo.fullName }}</h1>
                            <p class="text-blue-100 text-lg">{{ resumeData.personalInfo.title }}</p>
                            <div class="flex items-center space-x-4 mt-3 text-blue-100">
                                {{#if resumeData.personalInfo.email}}
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    {{ resumeData.personalInfo.email }}
                                </div>
                                {{/if}}
                                {{#if resumeData.personalInfo.phone}}
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                    {{ resumeData.personalInfo.phone }}
                                </div>
                                {{/if}}
                                {{#if resumeData.personalInfo.location}}
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    {{ resumeData.personalInfo.location }}
                                </div>
                                {{/if}}
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold">{{currentDate}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-4xl mx-auto p-8">
                <div class="grid grid-cols-3 gap-8 mb-8">
                    <div class="col-span-2">
                        <div class="bg-gray-50 rounded-2xl p-6 border-l-4 border-blue-500">
                            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <div class="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                                Cover Letter
                            </h2>
                            <div class="prose prose-lg max-w-none">
                                <div class="whitespace-pre-line text-gray-800 leading-relaxed">{{ coverLetterData.coverLetterText }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                            <h3 class="text-lg font-bold text-gray-900 mb-4 text-center">Role Alignment</h3>
                            <div class="flex justify-center mb-4">
                                <div class="relative inline-flex items-center justify-center w-24 h-24">
                                    <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" stroke-width="2" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-dasharray="{{coverLetterData.alignmentScore}}, 100" />
                                    </svg>
                                    <span class="absolute text-xl font-bold text-gray-900">{{coverLetterData.alignmentScore}}%</span>
                                </div>
                            </div>
                            <p class="text-sm text-gray-600 text-center">{{ getAlignmentDescription coverLetterData.alignmentScore }}</p>
                        </div>

                        {{#if coverLetterData.companyHighlights}}
                        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                            <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                <div class="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-3"></div>
                                Experience Highlights
                            </h3>
                            <div class="space-y-4">
                                {{#each coverLetterData.companyHighlights}}
                                <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300">
                                    <h4 class="font-bold text-lg text-gray-900 mb-3 text-center">{{this.companyName}}</h4>
                                    <p class="text-sm text-gray-700">{{this.keyAchievements.[0]}}</p>
                                </div>
                                {{/each}}
                            </div>
                        </div>
                        {{/if}}
                    </div>
                </div>

                {{#if coverLetterData.alignedSkills}}
                <div class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border-l-4 border-indigo-500">
                    <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <div class="w-2 h-6 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-full mr-3"></div>
                        Key Skills Match
                    </h2>
                    <div class="grid grid-cols-3 gap-6">
                        {{#each coverLetterData.alignedSkills}}
                        <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 flex items-center justify-center min-h-[80px]">
                            <span class="font-semibold text-gray-900 text-center">{{this.skillName}}</span>
                        </div>
                        {{/each}}
                    </div>
                </div>
                {{/if}}
            </div>
        </div>
    </div>
</body>
</html>
`;

