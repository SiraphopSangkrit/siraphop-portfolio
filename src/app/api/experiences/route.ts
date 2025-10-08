// app/api/experiences/route.ts - Experience CRUD operations
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Experience from '@/lib/models/Experience';

export async function GET() {
  try {
    await connectDB();
    
    const experiences = await Experience.find({}).sort({ order: 1, startDate: -1 });

    return NextResponse.json({
      success: true,
      data: experiences
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const experienceData = await request.json();
    
    if (!experienceData.company || !experienceData.position || !experienceData.startDate) {
      return NextResponse.json(
        { success: false, error: 'Company, position, and start date are required' },
        { status: 400 }
      );
    }

    const experience = new Experience(experienceData);
    await experience.save();

    return NextResponse.json({
      success: true,
      data: experience
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const { experiences } = await request.json();
    
    if (!Array.isArray(experiences)) {
      return NextResponse.json(
        { success: false, error: 'Experiences array is required' },
        { status: 400 }
      );
    }

    const results = [];
    
    // Bulk update experiences
    for (const experienceData of experiences) {
      const { _id, ...updateData } = experienceData;
      
      if (_id) {
        // Update existing experience
        const experience = await Experience.findByIdAndUpdate(
          _id,
          updateData,
          { new: true, runValidators: true }
        );
        if (experience) results.push(experience);
      } else {
        // Create new experience
        const experience = new Experience(updateData);
        await experience.save();
        results.push(experience);
      }
    }

    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error bulk updating experiences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update experiences' },
      { status: 500 }
    );
  }
}