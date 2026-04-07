import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle, AlertCircle } from 'lucide-react';

// 🎯 TEMPLATE VARIABLES - Replace with actual user choices
const DESIGN_SYSTEM = {
  // From STEP 1.5 - Service Naming
  serviceName: "TaskFlow", // Replace with confirmed service name
  
  // From Module 1
  theme: "Minimalist & Sophisticated", // Replace with user choice
  
  // From Module 3 - Enhanced Color Harmony System
  colorHarmony: "Monochromatic", // "Monochromatic", "Complementary", or "Analogous"
  colors: {
    // Primary color and variations
    primaryBase: "#3B82F6",
    primaryLight: "rgba(59, 130, 246, 0.15)", // alpha 0.15
    primarySubtle: "rgba(59, 130, 246, 0.05)", // alpha 0.05
    primaryHover: "#2563EB", // darker variant for hover
    
    // Optional secondary (only if not monochromatic)
    secondaryBase: "#10B981", // or null if monochromatic
    secondaryLight: "rgba(16, 185, 129, 0.15)",
    
    // Neutrals
    background: "#FFFFFF",
    text: "#111827", 
    neutral: "#F3F4F6",
    border: "#E5E7EB"
  },
  
  // From Module 4 - Default to Korean-friendly font
  typography: {
    headline: "Pretendard", // Korean-optimized default
    body: "Pretendard", // Korean-optimized default
    headlineStyle: "Bold weight, Large size",
    bodyStyle: "Normal weight, Readable size"
  },
  
  // From Module 6
  animations: "Subtle scale/brightness changes", // Replace with user choice
  
  // From Module 8
  buttonRadius: "rounded-xl", // Replace with user choice (xl recommended, 3xl not recommended)
  cardStyle: "Thin border, subtle shadow", // Replace with user choice
  chartType: "Line Charts" // Replace with user choice: "Line Charts" or "Area Charts"
};

// Color harmony validation function
const validateColorHarmony = (harmony, primaryBase, secondaryBase) => {
  const harmonies = {
    'Monochromatic': {
      isValid: !secondaryBase || secondaryBase === null,
      message: secondaryBase ? "단색 조화에서는 보조 색상을 사용하지 않습니다" : "완벽한 단색 조화"
    },
    'Complementary': {
      isValid: !!secondaryBase,
      message: !secondaryBase ? "보색 조화에는 대비되는 보조 색상이 필요합니다" : "보색 조화 완성"
    },
    'Analogous': {
      isValid: !!secondaryBase,
      message: !secondaryBase ? "유사색 조화에는 인접한 보조 색상이 필요합니다" : "유사색 조화 완성"
    }
  };
  return harmonies[harmony] || harmonies['Monochromatic'];
};

// Border radius variations for comparison
const getRadiusVariations = (selectedRadius) => {
  const radiusMap = {
    'rounded-none': { prev: null, current: 'rounded-none', next: 'rounded-sm', label: 'none (0px)' },
    'rounded-sm': { prev: 'rounded-none', current: 'rounded-sm', next: 'rounded-md', label: 'sm (2px)' },
    'rounded-md': { prev: 'rounded-sm', current: 'rounded-md', next: 'rounded-lg', label: 'md (6px)' },
    'rounded-lg': { prev: 'rounded-md', current: 'rounded-lg', next: 'rounded-xl', label: 'lg (8px)' },
    'rounded-xl': { prev: 'rounded-lg', current: 'rounded-xl', next: 'rounded-2xl', label: 'xl (12px)' },
    'rounded-2xl': { prev: 'rounded-xl', current: 'rounded-2xl', next: 'rounded-3xl', label: '2xl (16px)' },
    'rounded-3xl': { prev: 'rounded-2xl', current: 'rounded-3xl', next: null, label: '3xl (24px)' }
  };
  
  const current = radiusMap[selectedRadius] || radiusMap['rounded-lg'];
  return {
    variants: [
      current.prev && { class: current.prev, label: current.prev.replace('rounded-', '') },
      { class: current.current, label: current.label, selected: true },
      current.next && { class: current.next, label: current.next.replace('rounded-', '') }
    ].filter(Boolean),
    guideline: current.current === 'rounded-3xl' ? "🚨 3xl은 권장하지 않음 (너무 둥글 수 있음)" : 
               current.current === 'rounded-2xl' ? "⚠️ 2xl까지는 괜찮지만 웬만하면 xl 이하 권장" : null
  };
};

export default function DesignPreview() {
  const { colors, serviceName } = DESIGN_SYSTEM;
  const radiusVariations = getRadiusVariations(DESIGN_SYSTEM.buttonRadius);
  const harmonyValidation = validateColorHarmony(DESIGN_SYSTEM.colorHarmony, colors.primaryBase, colors.secondaryBase);
  
  return (
    <div 
      className="max-w-6xl mx-auto p-8 min-h-screen font-pretendard"
      style={{ backgroundColor: colors.background }}
    >
      {/* Pretendard 폰트 로드 */}
      <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/static/pretendard.css" />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
          🎨 {serviceName} Design System Preview
        </h1>
        <p className="text-opacity-70" style={{ color: colors.text }}>
          서비스 디자인 시스템 미리보기 - v0 프롬프트 생성 전 최종 확인
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Enhanced Color Palette with Alpha Variations */}
        <Card className="bg-white bg-opacity-80 backdrop-blur hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle style={{ color: colors.text }}>
                색상 조화 시스템 ({DESIGN_SYSTEM.colorHarmony})
              </CardTitle>
              <div className="flex items-center gap-2">
                {harmonyValidation.isValid ? (
                  <CheckCircle size={20} style={{ color: "#10B981" }} />
                ) : (
                  <AlertCircle size={20} style={{ color: "#F59E0B" }} />
                )}
              </div>
            </div>
            <p className="text-sm opacity-70" style={{ color: colors.text }}>
              {harmonyValidation.message}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary Color Variations */}
            <div>
              <p className="font-medium mb-3" style={{ color: colors.text }}>Primary Color Variations</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg border-2 border-white shadow-md"
                      style={{ backgroundColor: colors.primaryBase }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.text }}>Base (100%)</p>
                      <p className="text-xs opacity-60" style={{ color: colors.text }}>CTAs, Links</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg border-2 border-gray-200"
                      style={{ backgroundColor: colors.primaryLight }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.text }}>Light (15%)</p>
                      <p className="text-xs opacity-60" style={{ color: colors.text }}>Highlights, Hover</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg border-2 border-gray-200"
                      style={{ backgroundColor: colors.primarySubtle }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.text }}>Subtle (5%)</p>
                      <p className="text-xs opacity-60" style={{ color: colors.text }}>Background Tint</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg border-2 border-white shadow-md"
                      style={{ backgroundColor: colors.primaryHover }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.text }}>Hover</p>
                      <p className="text-xs opacity-60" style={{ color: colors.text }}>Darker Variant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Color (if exists) */}
            {colors.secondaryBase && (
              <div>
                <p className="font-medium mb-3" style={{ color: colors.text }}>Secondary Accent</p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg border-2 border-white shadow-md"
                      style={{ backgroundColor: colors.secondaryBase }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.text }}>Base</p>
                      <p className="text-xs opacity-60" style={{ color: colors.text }}>Tags, Status</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg border-2 border-gray-200"
                      style={{ backgroundColor: colors.secondaryLight }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.text }}>Light (15%)</p>
                      <p className="text-xs opacity-60" style={{ color: colors.text }}>Info Areas</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Color Usage Rules */}
            <div className="p-3 rounded-lg border" style={{ 
              backgroundColor: colors.primarySubtle, 
              borderColor: colors.primaryLight 
            }}>
              <p className="text-xs font-medium mb-1" style={{ color: colors.text }}>색상 사용 규칙</p>
              <p className="text-xs opacity-80" style={{ color: colors.text }}>
                • 총 {colors.secondaryBase ? '6' : '5'}개 색상으로 통일감 유지<br/>
                • Alpha 조정으로 새로운 variation 생성<br/>
                • 브랜드 일관성과 시각적 조화 우선
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Typography with Service Name */}
        <Card className="bg-white bg-opacity-80 backdrop-blur hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle style={{ color: colors.text }}>Typography (Pretendard 적용)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm opacity-70 mb-2" style={{ color: colors.text }}>Headlines ({DESIGN_SYSTEM.typography.headline})</p>
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                {serviceName} 헤드라인 Sample Headline
              </h2>
              <p className="text-xs opacity-50" style={{ color: colors.text }}>{DESIGN_SYSTEM.typography.headlineStyle}</p>
            </div>
            
            <div>
              <p className="text-sm opacity-70 mb-2" style={{ color: colors.text }}>Body ({DESIGN_SYSTEM.typography.body})</p>
              <p className="text-base leading-relaxed" style={{ color: colors.text }}>
                {serviceName}는 한글과 영문이 조화롭게 보이는 본문 텍스트입니다. This is sample body text showing how regular content will look in your application.
              </p>
              <p className="text-xs opacity-50" style={{ color: colors.text }}>{DESIGN_SYSTEM.typography.bodyStyle}</p>
            </div>
          </CardContent>
        </Card>

        {/* Component Styles with Radius Variations */}
        <Card className="bg-white bg-opacity-80 backdrop-blur hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle style={{ color: colors.text }}>Component Styles & Radius Variations</CardTitle>
            <p className="text-sm opacity-70" style={{ color: colors.text }}>
              선택된 radius: {DESIGN_SYSTEM.buttonRadius}
              {radiusVariations.guideline && (
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  radiusVariations.guideline.includes('🚨') ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {radiusVariations.guideline}
                </span>
              )}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: colors.text }}>Button Radius Comparison</p>
              <div className="flex gap-3 flex-wrap">
                {radiusVariations.variants.map((variant, index) => (
                  <div key={index} className="text-center">
                    <Button 
                      className={`${variant.class} transition-all hover:scale-105 hover:shadow-md ${variant.selected ? 'ring-2 ring-offset-2' : ''}`}
                      style={{ 
                        backgroundColor: variant.selected ? colors.primaryBase : colors.secondaryBase || colors.primaryBase,
                        ringColor: colors.primaryBase,
                        opacity: variant.selected ? 1 : 0.7 
                      }}
                    >
                      {variant.selected ? '✓ ' : ''}{variant.label}
                    </Button>
                    <p className="text-xs mt-1 opacity-60" style={{ color: colors.text }}>
                      {variant.selected ? '선택됨' : '비교용'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: colors.text }}>Alpha Variations in Action</p>
              <div className="space-y-3">
                <Input 
                  placeholder={`${serviceName}에서 사용할 입력 필드 예시`}
                  className="transition-all hover:shadow-md focus:shadow-lg focus:scale-[1.02]" 
                  style={{ borderColor: colors.primaryLight }}
                />
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    className="transition-all hover:scale-110 hover:shadow-md cursor-pointer"
                    style={{ backgroundColor: colors.primaryBase }}
                  >
                    Primary Badge
                  </Badge>
                  <Badge 
                    className="transition-all hover:scale-110 hover:shadow-md cursor-pointer"
                    style={{ backgroundColor: colors.primaryLight, color: colors.primaryBase, border: `1px solid ${colors.primaryBase}` }}
                  >
                    Light Variation
                  </Badge>
                  {colors.secondaryBase && (
                    <Badge 
                      className="transition-all hover:scale-110 hover:shadow-md cursor-pointer"
                      style={{ backgroundColor: colors.secondaryBase }}
                    >
                      Secondary
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Card Demonstration with Service Context */}
        <Card className="bg-white bg-opacity-80 backdrop-blur hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer">
          <CardHeader>
            <CardTitle style={{ color: colors.text }}>{serviceName} Interactive Preview</CardTitle>
            <p className="text-sm opacity-70" style={{ color: colors.text }}>
              실제 호버 효과를 확인해보세요! (마우스를 올려보세요)
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm opacity-60 mb-1" style={{ color: colors.text }}>Service Identity</p>
              <p className="font-medium" style={{ color: colors.text }}>{serviceName}</p>
            </div>
            
            <div>
              <p className="text-sm opacity-60 mb-1" style={{ color: colors.text }}>Color Harmony</p>
              <p className="font-medium" style={{ color: colors.text }}>{DESIGN_SYSTEM.colorHarmony}</p>
            </div>
            
            <div>
              <p className="text-sm opacity-60 mb-1" style={{ color: colors.text }}>Overall Theme</p>
              <p className="font-medium" style={{ color: colors.text }}>{DESIGN_SYSTEM.theme}</p>
            </div>
            
            <div>
              <p className="text-sm opacity-60 mb-1" style={{ color: colors.text }}>Chart Style (Consistency)</p>
              <p className="font-medium" style={{ color: colors.text }}>{DESIGN_SYSTEM.chartType}</p>
              <p className="text-xs opacity-50" style={{ color: colors.text }}>모든 데이터 시각화에 일관되게 적용</p>
            </div>

            {/* Alpha demonstration */}
            <div 
              className="p-3 rounded-lg transition-all hover:shadow-md"
              style={{ backgroundColor: colors.primarySubtle }}
            >
              <p className="text-xs font-medium mb-1" style={{ color: colors.text }}>Alpha Variation Demo</p>
              <p className="text-xs opacity-80" style={{ color: colors.text }}>
                이 영역은 Primary Color + 5% alpha를 사용합니다
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sample Layout Structure with Service Branding */}
      <Card className="mt-8 bg-white bg-opacity-80 backdrop-blur hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle style={{ color: colors.text }}>{serviceName} Sample Layout Structure</CardTitle>
          <p className="text-sm opacity-70" style={{ color: colors.text }}>선택한 디자인 시스템이 적용된 페이지 레이아웃 예시</p>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-opacity-20 rounded-lg p-6 bg-white bg-opacity-50" style={{ borderColor: colors.border }}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-opacity-20" style={{ borderColor: colors.border }}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: colors.primaryBase }}
                ></div>
                <div className="font-semibold" style={{ color: colors.text }}>{serviceName}</div>
              </div>
              <div className="flex gap-2">
                <div 
                  className="px-4 py-2 rounded-lg text-white text-sm"
                  style={{ backgroundColor: colors.primaryBase }}
                >
                  Primary CTA
                </div>
                <div 
                  className="px-4 py-2 rounded-lg text-sm border"
                  style={{ 
                    backgroundColor: colors.primaryLight, 
                    color: colors.primaryBase,
                    borderColor: colors.primaryBase 
                  }}
                >
                  Secondary
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1,2,3].map((i) => (
                <div 
                  key={i} 
                  className="bg-white bg-opacity-60 p-4 rounded-lg border border-opacity-20 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                  style={{ 
                    borderColor: colors.border,
                    backgroundColor: i === 2 ? colors.primarySubtle : undefined
                  }}
                >
                  <div 
                    className="w-full h-4 rounded mb-3 opacity-30" 
                    style={{ backgroundColor: colors.text }}
                  ></div>
                  <div 
                    className="w-3/4 h-3 rounded mb-2 opacity-20" 
                    style={{ backgroundColor: colors.text }}
                  ></div>
                  <div 
                    className="w-1/2 h-3 rounded opacity-20" 
                    style={{ backgroundColor: colors.text }}
                  ></div>
                  {i === 2 && (
                    <div className="mt-2 text-xs opacity-60" style={{ color: colors.text }}>
                      Primary Alpha Variation
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Confirmation */}
      <div className="mt-8 p-6 rounded-lg border" style={{ 
        backgroundColor: colors.primarySubtle, 
        borderColor: colors.primaryLight 
      }}>
        <h3 className="font-semibold mb-2" style={{ color: colors.primaryBase }}>✅ {serviceName} Design System Ready</h3>
        <p className="text-sm mb-4 opacity-90" style={{ color: colors.text }}>
          위의 디자인 선택사항들을 검토해보세요. 색상 조화가 {harmonyValidation.isValid ? '완벽하게' : '올바르게'} 설정되었고, 
          모든 것이 만족스럽다면 구체적인 페이지와 뷰를 정의하는 Module 9로 진행할 수 있습니다.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div style={{ color: colors.text }}>
            <strong>서비스명:</strong> {serviceName}
          </div>
          <div style={{ color: colors.text }}>
            <strong>색상 조화:</strong> {DESIGN_SYSTEM.colorHarmony}
          </div>
          <div style={{ color: colors.text }}>
            <strong>총 색상:</strong> {colors.secondaryBase ? '6개' : '5개'}
          </div>
        </div>
        <p className="text-sm opacity-80 mt-3" style={{ color: colors.text }}>
          <strong>다음 단계:</strong> 이 디자인 시스템을 {serviceName}의 특정 MVP 페이지에 적용하고 최종 v0 프롬프트를 생성합니다.
        </p>
      </div>
    </div>
  );
}