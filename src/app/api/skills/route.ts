// app/api/skills/route.ts - Skills CRUD operations
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/lib/models/Skill';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category) {
      query = { category };
    }
    
    const skills = await Skill.find(query).sort({ category: 1, order: 1, name: 1 });
    
    // Group skills by category
    const groupedSkills = skills.reduce((acc: any, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    return NextResponse.json({
      success: true,
      data: category ? skills : groupedSkills
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const skillData = await request.json();
    
    if (!skillData.name || !skillData.category) {
      return NextResponse.json(
        { success: false, error: 'Name and category are required' },
        { status: 400 }
      );
    }

    const skill = new Skill(skillData);
    await skill.save();

    return NextResponse.json({
      success: true,
      data: skill
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const { skills } = await request.json();
    
    if (!Array.isArray(skills)) {
      return NextResponse.json(
        { success: false, error: 'Skills array is required' },
        { status: 400 }
      );
    }

    const results = [];
    
    // Bulk update skills
    for (const skillData of skills) {
      const { _id, ...updateData } = skillData;
      
      if (_id) {
        // Update existing skill
        const skill = await Skill.findByIdAndUpdate(
          _id,
          updateData,
          { new: true, runValidators: true }
        );
        if (skill) results.push(skill);
      } else {
        // Create new skill
        const skill = new Skill(updateData);
        await skill.save();
        results.push(skill);
      }
    }

    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error bulk updating skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update skills' },
      { status: 500 }
    );
  }
}