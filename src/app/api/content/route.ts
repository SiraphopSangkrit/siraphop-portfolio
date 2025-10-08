// app/api/content/route.ts - Content CRUD operations
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/lib/models/Content';

export async function GET() {
  try {
    await connectDB();
    
    const content = await Content.find({}).sort({ section: 1, key: 1 });
    
    // Group content by section for easier frontend consumption
    const groupedContent = content.reduce((acc: any, item) => {
      if (!acc[item.section]) {
        acc[item.section] = {};
      }
      acc[item.section][item.key] = item.value;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: groupedContent
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { section, key, value, type = 'text' } = await request.json();

    if (!section || !key || value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Section, key, and value are required' },
        { status: 400 }
      );
    }

    // Upsert content (update if exists, create if not)
    const content = await Content.findOneAndUpdate(
      { section, key },
      { value, type, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error creating/updating content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const { section, updates } = await request.json();

    if (!section || !updates) {
      return NextResponse.json(
        { success: false, error: 'Section and updates are required' },
        { status: 400 }
      );
    }

    const results = [];
    
    // Update multiple content items for a section
    for (const [key, value] of Object.entries(updates)) {
      const content = await Content.findOneAndUpdate(
        { section, key },
        { value, updatedAt: new Date() },
        { upsert: true, new: true }
      );
      results.push(content);
    }

    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error bulk updating content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    );
  }
}