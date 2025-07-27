# Portfolio Skills API Integration

## Overview
The skills section now dynamically fetches and displays skills data from APIs. The system supports multiple data sources and includes fallback functionality.

## Features

### 🔄 **Dynamic Skills Loading**
- **GitHub API Integration**: Automatically fetches programming languages from your GitHub repositories
- **Custom API Support**: Can connect to any external API endpoint
- **Fallback System**: Uses predefined skills if API calls fail
- **Loading States**: Shows spinner while fetching data

### 🎨 **Visual Enhancements**
- **Animated Skill Bars**: Smooth fill animations with staggered timing
- **Color-Coded Skills**: Different colors for different technology categories
- **Responsive Design**: Adapts to different screen sizes
- **Hover Effects**: Interactive elements with smooth transitions

### 📊 **Data Processing**
- **GitHub Repository Analysis**: Analyzes repository languages and calculates skill percentages
- **Custom API Processing**: Flexible data structure support
- **Smart Fallbacks**: Graceful degradation when APIs are unavailable

## API Integration

### GitHub API (Default)
The system automatically fetches skills from your GitHub repositories:
```javascript
// Automatically called when skills section comes into view
skillsManager.fetchSkillsFromAPI();
```

### Custom API Integration
You can connect to any external API:

```javascript
// Example API response structure
{
  "skills": [
    {
      "name": "Java",
      "percentage": 85,
      "color": "mb-blue"
    },
    {
      "name": "Python", 
      "percentage": 80,
      "color": "mb-orange"
    }
  ]
}

// Call with your API endpoint
updateSkillsFromAPI('https://your-api.com/skills');
```

### Available Color Themes
- `mb-blue` - Blue gradient
- `mb-orange` - Orange gradient  
- `mb-light-purple` - Purple gradient
- `mb-teal` - Teal gradient
- `mb-green` - Green gradient
- `mb-red` - Red gradient
- `mb-yellow` - Yellow gradient
- `mb-pink` - Pink gradient

## Usage Examples

### 1. Basic GitHub Integration
```javascript
// Automatically loads when page loads
// No additional code needed
```

### 2. Custom API Integration
```javascript
// Update skills from your custom API
updateSkillsFromAPI('https://your-api.com/skills');
```

### 3. Manual Skills Update
```javascript
// Update skills programmatically
const skills = [
    { name: 'React', percentage: 90, color: 'mb-blue' },
    { name: 'Node.js', percentage: 85, color: 'mb-green' }
];
window.skillsManager.renderSkills(skills);
```

### 4. Real-time Updates
```javascript
// Update skills periodically
setInterval(() => {
    updateSkillsFromAPI('https://your-api.com/skills');
}, 300000); // Update every 5 minutes
```

## API Response Formats

### GitHub API
```json
[
  {
    "name": "repo-name",
    "language": "JavaScript",
    "html_url": "https://github.com/user/repo"
  }
]
```

### Custom API
```json
{
  "skills": [
    {
      "name": "Technology Name",
      "percentage": 85,
      "color": "mb-blue"
    }
  ]
}
```

## Error Handling

The system includes comprehensive error handling:

1. **API Failures**: Falls back to predefined skills
2. **Network Issues**: Shows loading state and retries
3. **Invalid Data**: Validates and sanitizes incoming data
4. **Rate Limiting**: Handles GitHub API rate limits gracefully

## Customization

### Adding New Color Themes
```css
.mb-custom {
    background: linear-gradient(135deg, #your-color1, #your-color2);
}
```

### Modifying Skill Processing
```javascript
// Customize how GitHub data is processed
processGitHubData(repos) {
    // Your custom logic here
    return processedSkills;
}
```

### Changing API Endpoints
```javascript
// Update the GitHub username
this.apiUrl = 'https://api.github.com/users/YOUR_USERNAME/repos';
```

## Performance Features

- **Lazy Loading**: Skills load only when section is visible
- **Caching**: Reduces API calls with smart caching
- **Debouncing**: Prevents excessive API calls
- **Progressive Enhancement**: Works without JavaScript

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## Troubleshooting

### Skills Not Loading
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Ensure CORS is properly configured
4. Check network connectivity

### API Rate Limiting
- GitHub API has rate limits for unauthenticated requests
- Consider using authenticated requests for production
- Implement caching to reduce API calls

### Custom API Issues
1. Verify API response format
2. Check CORS headers
3. Ensure API endpoint is public
4. Test with simple fetch request

## Future Enhancements

- [ ] Authentication support for private APIs
- [ ] Real-time skill updates via WebSocket
- [ ] Skill proficiency tracking over time
- [ ] Integration with LinkedIn Skills API
- [ ] Skill recommendations based on trends